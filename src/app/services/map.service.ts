import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { Deck, FlyToInterpolator } from '@deck.gl/core';
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

  public clearLayerState() {
    this.layersState = {};
  }

  public updateLayerStates(type: string, featureLayerNum: number): void {
    const length = Object.keys(this.layersState).length;
    for (let i=length; i>featureLayerNum; i--) {
      delete this.layersState[type+"_"+i.toString()];
    }
  }
  
  public addToRender(
    dataSrc: Promise<Line[]>, 
    selected: string, 
    color: ColorPair, 
    selectorID: string, 
    isVisible: boolean,
    linescale: number): void {

    this.layersState[selectorID] = [selectorID, dataSrc, color.rgb, 5,selected,isVisible,linescale]
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
        this.layersState[key][5], //isVisible
        this.layersState[key][6])) //linescale
    });
    this.deck.setProps({layers: newLayers});
  }

  public resetMapState() {
    //reset to initial map state
    this.deck.setProps({
      initialViewState: {
        longitude: this.env.viewState.longitude,
        latitude: this.env.viewState.latitude,
        zoom: this.env.viewState.zoom,
        transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
        transitionDuration: 'auto'
      }
    });
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

  private createLineLayer(
    layerId: string, 
    dataSrc: Promise<Line[]>, 
    color: number[], 
    lineWidth: number,
    selected: string,
    isVisible: boolean,
    lineScale: number): LineLayer {

    return  new LineLayer({
      id: layerId,
      data: dataSrc,
      opacity: 0.5,
      getSourcePosition: d => d.start,
      getTargetPosition: 
        d => [d.start[0],d.start[1],this.mapToLineHeight(selected,d.properties[selected])*lineScale],
      getColor: color,
      getWidth: lineWidth,
      pickable: true,
      autoHighlight: true,
      visible:isVisible,
      onHover: info => TooltipComponent.setTooltip(info.object,info.x,info.y,selected),
      updateTriggers: {
        getTargetPosition: [selected,lineScale],
        data: dataSrc
      }
    }) 
  }

  private mapToLineHeight(selected: string,value: number) {
    if (value < 1 && this.isSemanticSegmentationFeature(selected)) return value*1000;
    return value*10;
  }

  private isSemanticSegmentationFeature(selected: string): boolean {
    switch(selected) {
      case "Tree_Palm": return true;break;
      case "Grass_Field": return true;break;
      case "Plants_Flower": return true;break;
      case "Sky": return true;break;
      case "Path_Floor": return true;break;
      case "Built-up_Area": return true;break;
      default: return false;
    } 
  }
}
