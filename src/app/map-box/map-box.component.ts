import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { Deck } from '@deck.gl/core';
import { LineLayer } from '@deck.gl/layers';

import { DatabaseService } from '../database.service';
import { MapService } from '../map.service';
import * as pano from '../pano-settings';
import { FeatureCollection, Line } from "../pano-data";


@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})
export class MapBoxComponent implements OnInit {

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

  panoFeatures :string[] = pano.features; 
  panoLocations :string[] = pano.locations;
  panoActivities :string[] = pano.activities;
  panoTimeOfWeek :Object = pano.timeOfWeek;
  panoTimeOfDay :Object = pano.timeOfDay;
  panoTimeslot: string[];
  panoTimeslot1 :string[];
  panoTimeslot2 :string[];

  fb: any; //firebase reference

  //async data
  data_feature_collection: Promise<FeatureCollection>;
  data_locations_all: Promise<Object>;

  //user selections
  selectedFeature: string;
  selectedActivity: string;
  selectedLocation: string;
  selectedTimeOfWeek: string;
  selectedTimeOfDay: string;
  selectedTimeslot: string;
  
  isLocationSelected :boolean = false;
  isTimeslotSelected :boolean = false;
  //interactiveState = {isHover : false};

  constructor(private databaseService: DatabaseService,private mapservice: MapService) { }

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap(){
    this.fb = this.databaseService.firebase;
    this.buildDeckgl();
    //this.fetchLocationData();
    //disabled. currently implementation fires from select location in template.
  }

  public fetchLocationData() {
    //makes the request
    if (this.selectedLocation != undefined) {
      this.data_feature_collection = new Promise((resolve,reject) => {
        this.fb.ref("locations/"+this.selectedLocation).on('value',(snapshot)=> {
          resolve(snapshot.val());
          console.log("Fetched Successful.")
        })
      });
      this.renderLayers();
    }
  }

  public renderLayers() {
    const layers = [];
    
    if (this.selectedLocation !=undefined) {
      let dataSrc = this.data_feature_collection.then(data => this.FeatureCollectionToLine(data));
      const newLayer = this.createLineLayer("F", dataSrc, pano.colors["panoGreen"], 5,this.selectedFeature);
      const newLayer2 = this.createLineLayer("A", dataSrc, pano.colors["panoRed"], 3,this.selectedActivity);
      layers.push(newLayer);
      layers.push(newLayer2);
      this.deck.setProps({layers: layers});
    }
    else if (this.selectedLocation == null && this.selectedFeature == null){
      this.deck.setProps({layers: layers});
    }
  }

  public toggleLocationSelected() {
    if (this.selectedLocation != undefined) {
      this.isLocationSelected = true;
    }
    else {
      this.isLocationSelected = false;
      this.selectedLocation = null;
      this.selectedFeature = null;
      this.renderLayers();
    }
  }

  public setTimeslot() {
    this.panoTimeslot = this.selectedLocation != "punggol" && this.selectedLocation != "alexandra" ? 
      pano.timeslot1[this.selectedTimeOfDay] : pano.timeslot2[this.selectedTimeOfDay];
  }

  public toggleTimeslot() {
    this.isTimeslotSelected = this.selectedTimeslot != undefined;
  }

  public setTooltip(object,x,y) {
    const el = document.getElementById('tooltip');
    if (object) {
      el.innerHTML = this.selectedFeature + " : " + object.properties[this.selectedFeature] + "<br>" + 
                     this.selectedActivity + " : " + object.properties[this.selectedActivity];
      el.style.display = 'block';
      el.style.left = (x+30) + 'px';
      el.style.top = y + 'px';
    } else {
      el.style.display = 'none';
    }
  }

  private buildDeckgl() {

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      interactive: false,// Note: deck.gl will be in charge of interaction and event handling
      center: [this.INITIAL_VIEW_STATE.longitude, this.INITIAL_VIEW_STATE.latitude],
      zoom: this.INITIAL_VIEW_STATE.zoom,
      bearing: this.INITIAL_VIEW_STATE.bearing,
      pitch: this. INITIAL_VIEW_STATE.pitch
    });

    this.deck = new Deck({
      canvas: 'deck-canvas',
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
        });
      },
    });
  }
  
  private createLineLayer(layerId :string, dataSrc :Object, color:number[], lineWidth:number,selectedFeature :string) {
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
      onHover: info => this.setTooltip(info.object,info.x,info.y),
      updateTriggers: {
        getTargetPosition:[selectedFeature]
      }
    }) 
  }

  private LineHeightMultiplier(feature: string) {
    if (feature === "people" || feature === "people_active" || feature === "people_static") {
      return 50;
    }
    return 1000;
  }

  private getPeriod(panoTimeOfDay :string, panoTimeOfWeek :string) :string{
    if (panoTimeOfWeek == "Weekday" && panoTimeOfDay == "Morning") {
      return "wdm";
    }
    else if (panoTimeOfWeek == "Weekday" && panoTimeOfDay == "Evening") {
      return "wde";
    }
    else if (panoTimeOfWeek == "Weekend" && panoTimeOfDay == "Morning") {
      return "wem";
    }
    else if (panoTimeOfWeek == "Weekend" && panoTimeOfDay == "Evening") {
      return "wee";
    }
  }

  private FeatureCollectionToLine(fc :FeatureCollection) :Line[]{
    const features = fc.features;
    let extract = features.map((f)=>{
      return {"start":[f.geometry.coordinates[0],f.geometry.coordinates[1],0],
              "properties" : f.properties,
              "period" : f.properties.period,
              "timeslot" : f.properties.timeslot
      }
    });
    console.log(this.selectedTimeslot);
    
    let filteredExtract;
    if (this.isTimeslotSelected) {
      filteredExtract = extract.filter(
        (extract)=> (extract["period"]===this.getPeriod(this.selectedTimeOfDay,this.selectedTimeOfWeek)) &&
                    (extract["timeslot"]===this.selectedTimeslot)  
      );
      console.log(this.selectedTimeslot);
    }
    else {
      //to be implemented.
      //need to aggregate all the selected layers
    }
    console.log(filteredExtract);
    return filteredExtract;
  }



}


