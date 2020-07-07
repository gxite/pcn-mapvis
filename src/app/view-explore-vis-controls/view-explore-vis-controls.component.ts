import { Component, OnInit, Input} from '@angular/core';
import { IslandSettings, HeartlandSettings, NameAlias } from '../panoSettings';
import { DatabaseService, panoCategory, panoType } from '../database.service';

import { FeatureCollection, Line } from "../panoFeatureCollection";

@Component({
  selector: 'app-view-explore-vis-controls',
  templateUrl: './view-explore-vis-controls.component.html',
  styleUrls: ['./view-explore-vis-controls.component.scss']
})
export class ViewExploreVisControlsComponent implements OnInit {

  @Input() mapService; 

  //modes
  island = new IslandSettings();
  heartland = new HeartlandSettings();
  
  islandLocations: NameAlias[] = this.island.locations;
  islandFeatureFormFields= this.island.featureFormFields.map(field=>this.appendOptions(this.island,field)); 
  islandActivityFormFields= this.island.activityFormFields.map(field=>this.appendOptions(this.island,field)); 
  islandColors= this.island.color;

  heartlandLocations: NameAlias[] = this.heartland.locations;
  heartlandFormFields= this.heartland.featureFormFields.map(field=>this.appendOptions(this.heartland,field)); 
  heartlandActivityFormFields= this.heartland.activityFormFields.map(field=>this.appendOptions(this.heartland,field)); 
  heartlandColors= this.heartland.color;

  selectedLocations = [];
  selectedFeature;
  selectedActivity;

  currentTab: Tab = "Island"; //default

  fc = new FeatureCollection;

  constructor(
    private databaseService: DatabaseService) {}

  ngOnInit(){}

  appendOptions(mode,field: NameAlias) {//selects the corresponding option list and adds to the object
    field["var_options"] = mode[field.var_name];
    return field;
  }
  
  setLocations(selection: string[]) {this.selectedLocations = selection;}

  setFeature(selection: string) {
    this.selectedFeature = selection;
    if (this.selectedFeature == null) {
      this.mapService.clearLayerState();
      this.mapService.render();
    }
  }

  setActivity(selection: string) {
    this.selectedActivity = selection;
    if (this.selectedActivity == null) {
      this.mapService.clearLayerState();
      this.mapService.render();
    }
  }

  getDatabaseCategory(currentTab: string): panoCategory{
    switch (currentTab) {
      case "Island": return "panoObject";
      case "Heartland": return "panoAction";
    }
  }

  toggleMode(selectedIndex: number) {
    switch (selectedIndex) {
      case 0: this.currentTab = "Island"; break;
      case 1: this.currentTab = "Heartland"; break;
    }
  }

  clearSelectedLocations() {
    this.selectedLocations = [];
    console.log("Location selections cleared.");
  }

  update() {
    //runs every user interaction to check and update state
    if (this.selectedLocations) {
      this.mapService.clearLayerState();
      if (this.selectedFeature) {this.selectedLocations.map(location=>this.addToMap(this.currentTab,"parkFeatures",location));}
      if (this.selectedActivity) {this.selectedLocations.map(location=>this.addToMap(this.currentTab,"parkActivities",location));}
      this.mapService.render();
    } 
  }

  addToMap(tab: Tab, type: panoType, location) {

    let category =this.getDatabaseCategory(tab);
    let dataSrc = this.databaseService.fetchData(category,type,location).then(data =>this.fc.transformToLine(data));
    let color;
    let id;

    switch(tab){
      case "Island": color = this.island.color; break;
      case "Heartland": color = this.heartland.color; break;
    }

    switch(type){
      case "parkFeatures":
        id = this.generateID(location,"feature");
        this.mapService.addToRender(dataSrc,this.selectedFeature,color[this.selectedFeature],id,true);
        break;
      case "parkActivities":
        id = this.generateID(location,"activities");
        this.mapService.addToRender(dataSrc,this.selectedActivity,color[this.selectedActivity],id,true);
        break;
    }
  }

  private generateID(location: string,selection: string) {  //implement a more robust id gen
    return location+selection;
  }

}

type Tab = "Island" | "Heartland";