import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { Deck } from '@deck.gl/core';
import { LineLayer } from '@deck.gl/layers';
import { ColorPair } from 'src/app/panoSettings';
import { Line, FeatureCollection } from "src/app/panoFeatureCollection";
import { environment } from 'src/environments/environment';
import { TooltipComponent } from 'src/app/tooltip/tooltip.component';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  //map settings 
  map: mapboxgl.Map;   
  deck: Deck;
  env; 

  layersState = {};
  fc =new FeatureCollection;

  constructor() {
    this.env = environment;
    mapboxgl.accessToken = this.env.mapboxConfig.accessToken;
  }

  public buildMap(containerID : string, deckID :string): void {
    this.createMapbox(containerID);
    this.createDeckGl(deckID);
  }

  private createMapbox(containerID : string): void {
    this.map = new mapboxgl.Map({
      container: containerID,
      style: this.env.mapboxConfig.style,
      interactive: false,//deck.gl in charge of interaction and event handling
      center: [this.env.viewState.longitude, this.env.viewState.latitude],
      zoom: this.env.viewState.zoom,
      bearing: this.env.viewState.bearing,
      pitch: this.env.viewState.pitch
    });
  }

  private createDeckGl(deckID :string): void {
    this.deck = new Deck({
      canvas: deckID,
      width: '100%',
      height: '100%',
      initialViewState: this.env.viewState,
      controller: true,
      getCursor: (interactiveState) => interactiveState ? "crosshair":"grab", // buggy
      onViewStateChange: ({viewState}) => {
        this.map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch
        });// mouse interaction controls
      },
    });
  }

  private createLineLayer(layerId: string, dataSrc: Promise<Line[]>, color: number[], lineWidth: number,selected: string,isVisible: boolean): LineLayer {
    return  new LineLayer({
      id: layerId,
      data: dataSrc,
      opacity: 0.5,
      getSourcePosition: d => d.start,
      getTargetPosition: 
        d => [d.start[0],d.start[1],d.properties[selected]*this.LineHeightMultiplier(selected)],
      getColor: color,
      getWidth: lineWidth,
      pickable: true,
      autoHighlight: true,
      visible:isVisible,
      onHover: info => TooltipComponent.setTooltip(info.object,info.x,info.y,selected),
      updateTriggers: {
        getTargetPosition: selected,
        data: dataSrc
      }
    }) 
  }

  private LineHeightMultiplier(feature: string): number {
    if (feature === "people" || feature === "people_active" || feature === "people_static") return 50;
    else if (feature === "facilities_25m" || feature === "facilities_50m") return 50;
    else if (feature === "carpark_lots_100m" || feature === "carpark_lots_200m") return 1;
    else return 1000;  
  }

  public render(): void {
    let newLayers=[];
    Object.keys(this.layersState).forEach(key=> {
      newLayers.push(this.createLineLayer(
        this.layersState[key][0], //layerId
        this.layersState[key][1], //dataSrc
        this.layersState[key][2], //color
        this.layersState[key][3], //lineWidth
        this.layersState[key][4], //selected
        this.layersState[key][5])) //isVisible
    });
    this.deck.setProps({layers: newLayers});
  }

  public clearLayerState() {
    this.layersState = {};
  }

  public updateLayerStates(type: string, featureLayerNum: number): void {
    const length = Object.keys(this.layersState).length;
    for (let i=length; i>featureLayerNum; i--) {
      delete this.layersState[type+"_"+i.toString()];
    }
  }
  
  public addToRender(dataSrc: Promise<Line[]>, selected: string, color: ColorPair, selectorID: string, isVisible: boolean): void {
    this.layersState[selectorID] = [selectorID, dataSrc, color.rgb, 5,selected,isVisible]
  }
}
