import { Component, OnInit, Input} from '@angular/core';
import { IslandSettings, HeartlandSettings, NameAlias } from 'src/app/panoSettings';
import { DatabaseService, panoCategory, panoType } from 'src/app/services/database.service';

import { FeatureCollection} from "src/app/panoFeatureCollection";

type Tab = "Island" | "Heartland";
type SelectorType = "feature" | "activity";
interface Selector { value: string; visibility: boolean};

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
  selectedFeature: Selector = { value:null, visibility: null};
  selectedActivity: Selector = { value:null, visibility: null};

  currentTab: Tab = "Island"; //default

  fc = new FeatureCollection;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(){}

  appendOptions(mode,field: NameAlias) {//selects the corresponding option list and adds to the object
    field["var_options"] = mode[field.var_name];
    return field;
  }
  
  setLocations(selection: string[]) {this.selectedLocations = selection;}

  setSelector(type: SelectorType, value: string) {
    let selected;
    switch(type) {
      case "feature": selected=this.selectedFeature;break;
      case "activity": selected=this.selectedActivity;break;
    }

    if (selected != null) {
      selected.value = value;
    }
    else {
      this.mapService.clearLayerState();
      this.mapService.render();
    }
  }

  setVisibility(type: SelectorType, visibility: boolean) {
    let selected;
    switch(type) {
      case "feature": selected=this.selectedFeature;break;
      case "activity": selected=this.selectedActivity;break;
    }

    if (selected != null) {
      selected.visibility = visibility;
    }
    else {
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
      if (this.selectedFeature.value != null) {this.selectedLocations.map(location=>this.addToMap(this.currentTab,"parkFeatures",location));}
      if (this.selectedActivity.value != null) {this.selectedLocations.map(location=>this.addToMap(this.currentTab,"parkActivities",location));}
      this.mapService.render();
    } 
  }

  private addToMap(tab: Tab, type: panoType, location) {

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
        this.mapService.addToRender(dataSrc,this.selectedFeature.value,color[this.selectedFeature.value],id,this.selectedFeature.visibility);
        break;
      case "parkActivities":
        id = this.generateID(location,"activity");
        this.mapService.addToRender(dataSrc,this.selectedActivity.value,color[this.selectedActivity.value],id,this.selectedActivity.visibility);
        break;
    }
  }

  private generateID(location: string,selection: string) {
    return location+selection;
  }
}
