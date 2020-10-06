/* Description: Keeps track the current menu selection states. 
                Contains methods to access and set states.
*/

import { Injectable } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';
import { FeatureCollection, Line} from "src/app/panoFeatureCollection";

import { ExploreStateService } from './explore-state.service';
import { DatabaseService,localType, dbCategory } from 'src/app/services/database.service';
import { MapService } from './map.service';

export interface Layer {value: Object; layerType: localType; color: number[]; visibility: boolean; lineScale: number; loading:boolean};

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private locations = new BehaviorSubject<string[]>(null);
  private features = new BehaviorSubject<Layer>(null);
  private activities = new BehaviorSubject<Layer>(null);
  private fc = new FeatureCollection(); 

  currentLocations = this.locations.asObservable();
  currentFeatures = this.features.asObservable();
  currentActivities = this.activities.asObservable();

  //state
  isNewLocation: boolean = true;

  //subscription 
  s_exploreState: Subscription;

  //subscription data
  databaseCategory: dbCategory;
  
  constructor(
    private exploreStateService: ExploreStateService,
    private mapService: MapService,
    private databaseService: DatabaseService) {
      this.s_exploreState = this.exploreStateService.currentState.subscribe(
        state => this.databaseCategory  = this.databaseService.getDatabaseCategory(state));
   }

  ngOnDestroy() {
    console.log("SelectionService unsubscribing from ExploreStateService");
    this.s_exploreState.unsubscribe();
  } 

  setLocations(locations: string[]) {
    this.isNewLocation = !(this.locations.value == locations);
    this.locations.next(locations);
    this.updateLayerStates();
  }

  setFeatures(features: Layer) {
    this.features.next(features);
    this.updateLayerStates();
  }

  setActivities(activities: Layer) {
    this.activities.next(activities);
    this.updateLayerStates();
  }

  clearSelections() {
    this.setFeatures(null);
    this.setActivities(null);
    this.setLocations(null);
  }

  private updateLayerStates(){
    if(this.locations.value == null) return;
    if(this.activities.value == null && this.features.value == null) return;

    //runs every user interaction to check and update state
    //***this is to be optimised later to only update the changed layersState instead of clearing all and repopulate
    this.mapService.clearLayerState();

    //for every location in locations
    this.locations.value.map(location=>{
        if (this.features.value != null && !this.isEmpty(this.features.value)) {
          this.fetchAndPush(this.databaseCategory,"features",location,this.features);
        }
        if (this.activities.value!= null && !this.isEmpty(this.activities.value)) {
          this.fetchAndPush(this.databaseCategory,"activities",location, this.activities);
        }
      })
    this.mapService.render();
  }

  private isEmpty(layer: Layer): boolean {
    return Object.keys(layer.value).length == 0;
  }

  private generateID(location: string, layer:Layer) {
    let layerType=layer.layerType;
    switch(layerType){
      case "features" : return location+layerType+layer.value["features"].name;
      case "activities" : return location+ layerType+layer.value["activities"].name;
    }
  }

  private fetchAndPush(category:dbCategory,localType: localType,location: string, layerSubject: BehaviorSubject<Layer>) {

    let layer = layerSubject.value;
    let layerValue = layer.value
    let selectionName = layerValue[localType].name;
    let dbType = this.databaseService.getDatabaseType(localType);
    
    layer.loading = true;//set loading when fetching

    //fetch the data from the DatabaseService
    let dataSrc: Promise<Line[]> = this.databaseService.fetchData(category,dbType,location).then(data =>{

      layer.loading=false;//reset loading once fetched

      if (category=="panoAction" && this.isNewLocation) {
        this.mapService.flyToSingle(data);//viewport zoom controls
        this.isNewLocation = false;
      }
      return data;
    });

    //this enables the filtering of TimeOfWeek aand TimeOfDay
    if (localType=="activities") dataSrc = this.activitySelectionFilter(dataSrc);

    //then push to the layersState list within MapService
    this.mapService.addToLayersStateList(
      dataSrc,
      selectionName,
      layer.color,
      this.generateID(location,layer),
      layer.visibility,
      layer.lineScale);
  }

  private activitySelectionFilter(data: Promise<Line[]>): Promise<Line[]>  {
    let value = this.activities.value.value;
    let timeOfWeek = value['timeOfWeek'];
    let timeOfDay= value['timeOfDay'];
    let timeslot= value["timeslot"];
    let period = timeOfWeek && timeOfDay ? timeOfWeek.name+timeOfDay.name : null;
    let Empty = this.isUndefined;
    let notEmpty = f => !Empty(f);
    
    if (Empty(timeOfWeek) && Empty(timeOfDay) && Empty(timeslot)) 
      return data.then(d=>this.fc.filterByActivity(d));

    else if (notEmpty(timeOfWeek) && Empty(timeOfDay) && Empty(timeslot)) 
      return data.then(d=>this.fc.filterByWeek(d,timeOfWeek.name));
    
    else if (Empty(timeOfWeek) && notEmpty(timeOfDay) && Empty(timeslot)) 
      return data.then(d=>this.fc.filterByDay(d,timeOfDay.name));

    else if (Empty(timeOfWeek) && notEmpty(timeOfDay) && notEmpty(timeslot))  
      return data.then(d=>this.fc.filterByTimeslotAndTimeOfDay(d,timeOfDay.name,timeslot.name));

    else if (notEmpty(timeOfWeek) && notEmpty(timeOfDay) && Empty(timeslot)) 
      return data.then(d=>this.fc.filterByPeriod(d,period));

    else if (notEmpty(timeOfWeek)  && notEmpty(timeOfDay) && notEmpty(timeslot)) 
      return data.then(d=>this.fc.filterByTimeslot(d,period,timeslot.name));
  }

  private isUndefined(value: string): boolean {
    return value == undefined;
  }
}



