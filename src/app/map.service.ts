import { Injectable } from '@angular/core';


import * as mapboxgl from 'mapbox-gl';
import { Deck } from '@deck.gl/core';
import { LineLayer } from '@deck.gl/layers';
import * as pano from './pano-settings';
import { Line, FeatureCollection } from "./pano-data";
import { environment } from '../environments/environment';
import { TooltipComponent } from './tooltip/tooltip.component'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  //map settings 
  map: mapboxgl.Map;   
  deck: Deck;
  style: string = 'mapbox://styles/gxite/ck7t2v2d810oy1irrp09ni5ss';
  message: string = 'Singapore';
  INITIAL_VIEW_STATE = {
    latitude: 1.3580576343735706,
    longitude: 103.80844116210938,
    zoom: window.innerWidth < 400 ? 9 : 11,
    bearing: 0,
    pitch: 30
  };

  layersState = {};
  fc =new FeatureCollection;

  constructor() {
    //assigning the accessToken stored in environments to mapboxgl
    mapboxgl.accessToken = environment.mapboxConfig.accessToken;
  }

  public buildMap(containerID : string, deckID :string): void {
    this.createMapbox(containerID);
    this.createDeckGl(deckID);
  }

  private createMapbox(containerID : string): void {
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

  private createDeckGl(deckID :string): void {
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

  private createLineLayer(layerId :string, dataSrc :Promise<Line[]>, color:number[], lineWidth:number,selected :string): LineLayer {
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
      onHover: info => TooltipComponent.setTooltip(info.object,info.x,info.y,selected),
      updateTriggers: {
        getTargetPosition: selected,
        data: dataSrc
      }
    }) 
  }

  private LineHeightMultiplier(feature: string): number {
    if (feature === "people" || feature === "people_active" || feature === "people_static") {
      return 50;
    }
    else if (feature === "facilities_25m" || feature === "facilities_50m") {
      return 50;
    }
    else if (feature === "carpark_lots_100m" || feature === "carpark_lots_200m") {
      return 1;
    }
    else {
      return 1000;
    }   
  }

  private activityAtTimeslot(data: Line[],timeOfWeek: string,timeOfDay: string,timeslot: string): Line[] {
    return this.fc.timeslot(data,timeOfWeek,timeOfDay,timeslot);
  }
  
  //timeOfWeek selected
  private activityAggregateTimeOfWeek(data: Line[], timeOfWeek: string): Line[] { 
    return this.fc.week(data,timeOfWeek);
  }

  //timeOfDay selected
  private activityAggregateTimeOfDay(data: Line[],timeOfDay: string): Line[] { 
    return this.fc.day(data,timeOfDay);
  }

  //timeOfDay and timeOfWeek selected
  private activityAtPeriod(data: Line[],timeOfWeek: string,timeOfDay: string): Line[] {
    return this.fc.period(data,timeOfWeek,timeOfDay);
  }

  public updateLayerStates(type: string, featureLayerNum: number): void {
    const length = Object.keys(this.layersState).length;
    for (let i=length; i>featureLayerNum; i--) {
      delete this.layersState[type+"_"+i.toString()];
    }
  }

  public render(): void {
    let newLayers=[];
    Object.keys(this.layersState).forEach(key=> {
      newLayers.push(this.createLineLayer(
        this.layersState[key][0],
        this.layersState[key][1],
        this.layersState[key][2],
        this.layersState[key][3],
        this.layersState[key][4])) 
    });
    this.deck.setProps({layers: newLayers});
  }

  public getLayerPromise(selectorID :string, selectedProperties :string): Promise<number[]> {
    if (this.layersState[selectorID]) {
      return this.layersState[selectorID][1].then(data=>this.fc.extractPropertiesArray(data,selectedProperties));
    }
  }

  public addFeature(dataSrc: Promise<Line[]>, selectedFeature :string, selectorID :string): void {
    this.layersState[selectorID] = [selectorID, dataSrc, pano.colors[selectedFeature].rgb, 10,selectedFeature]
  }

  public addActivity(
    dataSrc: Promise<Line[]>, 
    selectedActivity: string, 
    selectorID: string,
    timeOfWeek: string,
    timeOfDay: string,
    timeslot: string): void {

    let toAdd: boolean = false;

    if (timeOfWeek && timeOfDay && timeslot) {
      dataSrc = dataSrc.then(data=>this.activityAtTimeslot(data,timeOfWeek,timeOfDay,timeslot));
      toAdd=true;
    }
    else if (timeOfWeek && timeOfDay && !timeslot) {
      dataSrc = dataSrc.then(data=>this.activityAtPeriod(data,timeOfWeek,timeOfDay));
      toAdd=true;
    }
    else if (timeOfWeek && !timeOfDay && !timeslot) {
      dataSrc = dataSrc.then(data=>this.activityAggregateTimeOfWeek(data,timeOfWeek));
      toAdd=true; 
    }
    else if (!timeOfWeek && timeOfDay && !timeslot) {
      dataSrc = dataSrc.then(data=>this.activityAggregateTimeOfDay(data,timeOfDay));
      toAdd=true;
    }
    
    if (toAdd) {
      this.layersState[selectorID] = [selectorID, dataSrc, pano.colors[selectedActivity].rgb, 3,selectedActivity];
      toAdd = false;
    }
    else {
      this.layersState[selectorID] = [selectorID, dataSrc.then(data=>[]), [], 0,""];//dummy layer used for flushing
    }
  }


}
