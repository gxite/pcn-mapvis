import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { Deck } from '@deck.gl/core';
import { LineLayer, GeoJsonLayer } from '@deck.gl/layers';
import * as pano from './pano-settings';
import { Line } from "./map";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  //map settings 
  map: mapboxgl.Map;   
  deck: Deck;
  style :string = 'mapbox://styles/gxite/ck7t2v2d810oy1irrp09ni5ss';
  message :string = 'Singapore';
  INITIAL_VIEW_STATE = {
    latitude: 1.3580576343735706,
    longitude: 103.80844116210938,
    zoom : window.innerWidth < 400 ? 9 : 11,
    bearing: 0,
    pitch: 30
  };

  layersToRender = [];
  layersCount :number = 0;

  

  constructor() {}

  public buildMap(containerID : string, deckID :string) {
    this.createMapbox(containerID);
    this.createDeckGl(deckID);
  }

  private createMapbox(containerID : string) {
    this.map = new mapboxgl.Map({
      container: containerID,
      style: this.style,
      interactive: false,// Note: deck.gl will be in charge of interaction and event handling
      center: [this.INITIAL_VIEW_STATE.longitude, this.INITIAL_VIEW_STATE.latitude],
      zoom: this.INITIAL_VIEW_STATE.zoom,
      bearing: this.INITIAL_VIEW_STATE.bearing,
      pitch: this. INITIAL_VIEW_STATE.pitch
    });
  }

  private createDeckGl(deckID :string) {
    this.deck = new Deck({
      canvas: deckID,
      width: '100%',
      height: '100%',
      initialViewState: this.INITIAL_VIEW_STATE,
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

  private createLineLayer(layerId :number, dataSrc :Object, color:number[], lineWidth:number,selectedFeature :string) {
    return  new LineLayer({
      id: layerId,
      data: dataSrc,
      opacity: 0.8,
      getSourcePosition: d => d.start,
      getTargetPosition: 
        d => [d.start[0],d.start[1],d.properties[selectedFeature]*this.LineHeightMultiplier(selectedFeature)],
      getColor: color,
      getWidth: lineWidth,
      pickable: true,
      /* onHover: info => this.setTooltip(info.object,info.x,info.y), */
/*       updateTriggers: {
        getTargetPosition:[selectedFeature],
        id: [layerId],
        data: [dataSrc]
      } */
    }) 
  }

  private createNullLayer(layerId :number) {
    return  new LineLayer({
      id: layerId,
      data: [],
    }) 
  }


  private LineHeightMultiplier(feature: string) {
    if (feature === "people" || feature === "people_active" || feature === "people_static") {
      return 50;
    }
    return 1000;
  }

  reset() {
    this.layersCount = 0;
    this.layersToRender = [];
  }

  addLocation(dataSrc: Promise<Line[]>, selectedFeature :string) {
    console.log(selectedFeature);
    console.log(dataSrc);
    const newLayer = this.createLineLayer(this.layersCount, dataSrc, pano.colors["panoGreen"], 5,selectedFeature);
    this.layersCount++;
    this.layersToRender.push(newLayer);
    console.log(this.layersToRender);
  }

  render() {
    this.deck.setProps({layers: this.layersToRender})
    this.reset();
  }



}
