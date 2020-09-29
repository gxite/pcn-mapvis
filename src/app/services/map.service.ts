/* Description: Contains methods that handles map creation and navigation */

import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { Deck, FlyToInterpolator } from '@deck.gl/core';
import { LineLayer } from '@deck.gl/layers';

import { Line, FeatureCollection } from "src/app/panoFeatureCollection";
import { environment } from 'src/environments/environment';
import { TooltipComponent } from 'src/app/tooltip/tooltip.component';
import { ExploreStateService } from './explore-state.service';
import { localCategory } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  //map settings 
  map: mapboxgl.Map;   
  deck: Deck;
  env; 

  //explore state
  currentState: localCategory;

  layersState = {};
  fc =new FeatureCollection;
  temp;

  LINEWIDTH = 5;

  constructor(
    private exploreStateService: ExploreStateService) {
      this.env = environment;
      mapboxgl.accessToken = this.env.mapboxConfig.accessToken;
      this.exploreStateService.currentState.subscribe(state=>this.currentState=state);
  }

  public buildMap(containerID : string, deckID :string): void {
    this.temp = deckID
    this.createMapbox(containerID);
    this.createDeckGl(deckID);
  }

  public clearLayerState() {
    this.layersState = {};
  }
  
  public addToLayersStateList(
    dataSrc: Promise<Line[]>, 
    selectionName: string, 
    lineColor: number[], 
    selectorID: string, 
    isVisible: boolean,
    linescale: number): void {

    this.layersState[selectorID] = [selectorID, dataSrc, lineColor, this.LINEWIDTH,selectionName,isVisible,linescale];

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
    this.clearLayerState();
    //reset to initial map state
    this.deck.setProps({
      initialViewState: {
        longitude: this.env.viewState.longitude,
        latitude: this.env.viewState.latitude,
        zoom: this.env.viewState.zoom,
        pitch: this.env.viewState.pitch,
        transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
        transitionDuration: 'auto'
      },
    });
  } 

  public flyToSingle(data: Line[]): void {
    if (data == null) return;

    switch(this.currentState) {
      case "heartland": this.flyToLocation(this.getCenterCoordinate(data),15);break;
      case "island": this.flyToLocation(this.getCenterCoordinate(data),13);break;
    }  
  }

  //takes in number[] in the form [long,lat]
  private flyToLocation(coord: number[],zoom: number=15): void {
    this.deck.setProps({
      initialViewState: {
        longitude: coord[0],
        latitude: coord[1],
        zoom: zoom,
        pitch: 30,
        transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
        transitionDuration: 'auto'
      },
    });
  }

  private getCenterCoordinate(data: Line[]): number[] {
    let length = data.length;
    let longitude = data.reduce((sum,line)=>sum+line.start[0],0) / length;
    let latitude = data.reduce((sum,line)=>sum+line.start[1],0) / length;

    return [longitude,latitude]
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
    return value*100;
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
