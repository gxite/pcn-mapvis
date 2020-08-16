import { Component, OnInit, Input,  ViewChildren, QueryList, Output, EventEmitter} from '@angular/core';
import { IslandSettings, HeartlandSettings, NameAlias } from 'src/app/panoSettings';
import { DatabaseService, panoCategory, panoType } from 'src/app/services/database.service';

import { FeatureCollection, Line} from "src/app/panoFeatureCollection";
import { SelectorTilesComponent } from 'src/app/selectors/selector-tiles/selector-tiles.component';
import { SelectorExpPanelComponent } from 'src/app/selectors/selector-exp-panel/selector-exp-panel.component';

type Tab = "Island" | "Heartland";
type SelectorType = "feature" | "activity";
interface Selector { value: any; visibility: boolean; loading:boolean};

@Component({
  selector: 'app-view-explore-vis-controls',
  templateUrl: './view-explore-vis-controls.component.html',
  styleUrls: ['./view-explore-vis-controls.component.scss']
})
export class ViewExploreVisControlsComponent implements OnInit {

  @ViewChildren('selectorTiles') children_selectorTiles: QueryList<SelectorTilesComponent>;
  @ViewChildren('selectorExpPanel') children_selectorExpPanel: QueryList<SelectorExpPanelComponent>;

  @Input() mapService; 
  @Output() stats = new EventEmitter();

  fc = new FeatureCollection;

  //island setttings
  island = new IslandSettings();
  islandLocations: NameAlias[] = this.island.locations;
  islandFeatureFormFields= this.island.featureFormFields.map(field=>this.appendOptions(this.island,field));
  islandActivityFormFields= this.island.activityFormFields.map(field=>this.appendOptions(this.island,field)); 
  islandColors= this.island.color;

  //heartland setttings
  heartland = new HeartlandSettings();
  heartlandLocations: NameAlias[] = this.heartland.locations;
  heartlandFeatureFormFields= this.heartland.featureFormFields.map(field=>this.appendOptions(this.heartland,field)); 
  heartlandActivityFormFields= this.heartland.activityFormFields.map(field=>this.appendOptions(this.heartland,field)); 
  heartlandColors= this.heartland.color;
  

  //selected locations store either island or heartland data
  selectedLocations = [];
  selectedFeature: Selector = { value:null, visibility: null, loading:false};
  selectedActivity: Selector = { value:null, visibility: null, loading:false};
  currentTab: Tab = "Island"; //default

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(){}

  setLocations(selection: string[]) {
    this.selectedLocations = selection;
    this.update();
  }

  setSelector(type: SelectorType, value: Object) {
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
    this.update();
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
    this.update();
  }

  toggleMode(selectedIndex: number) {
    switch (selectedIndex) {
      case 0: this.currentTab = "Island"; break;
      case 1: this.currentTab = "Heartland"; break;
    }
    
    //resets all children components & selections
    this.children_selectorTiles.forEach(c=>c.reset());
    this.children_selectorExpPanel.forEach(c=>c.reset());
    this.selectedFeature = { value:null, visibility: null, loading:false};
    this.selectedActivity = { value:null, visibility: null, loading:false};
  }

  clearSelectedLocations() {
    this.selectedLocations = [];
    console.log("Location selections cleared.");
  }

  update() {
    //runs every user interaction to check and update state
    this.mapService.clearLayerState();
    if (this.selectedFeature.value != null) {
      this.selectedLocations.map(location=>this.addToMap(this.currentTab,"parkFeatures",location));
    }
    if (this.selectedActivity.value != null) {
      this.selectedLocations.map(location=>this.addToMap(this.currentTab,"parkActivities",location));
    }
    this.mapService.render();
  }

  getActivitySelectorLoading() {return this.selectedActivity.loading;}

  getFeatureSelectorLoading() {return this.selectedFeature.loading;}

  //this reconcile the naming convention with database naming convention  
  private getDatabaseCategory(currentTab: string): panoCategory{
    switch (currentTab) {
      case "Island": return "panoObject";
      case "Heartland": return "panoAction";
    }
  }

  //selects the corresponding option list and adds to the object
  private appendOptions(mode,field: NameAlias) {
    field["var_options"] = mode[field.var_name];
    return field;
  
  }

  private addToMap(tab: Tab, type: panoType, location) {
    
    let category =this.getDatabaseCategory(tab);

    if(type=="parkActivities") this.selectedActivity.loading=true;
    if(type=="parkFeatures") this.selectedFeature.loading=true;

    let dataSrc: Promise<Line[]> = this.databaseService.fetchData(category,type,location).then(data =>{

      if(type=="parkFeatures") this.selectedFeature.loading=false;
      if(type=="parkActivities") this.selectedActivity.loading=false;
      
      if (this.selectedActivity.value != null)
        this.stats.emit([data,this.selectedActivity.value.activities.var_name]);//emit to stats viewer test
      return data;
    });

    let color;

    switch(tab){
      case "Island": color = this.island.color; break;
      case "Heartland": color = this.heartland.color; break;
    }

    switch(type){
      case "parkFeatures":
        this.mapService.addToRender(
          dataSrc,
          this.selectedFeature.value['features'].var_name,
          color[this.selectedFeature.value['features'].var_name],
          this.generateID(location,"features"),
          this.selectedFeature.visibility);
        break;
      case "parkActivities":
        dataSrc = this.activityDataModifier(dataSrc);//additional datasrc transformation for activity selection
        this.mapService.addToRender(
          dataSrc,
          this.selectedActivity.value['activities'].var_name,
          color[this.selectedActivity.value['activities'].var_name],
          this.generateID(location,"activities"),
          this.selectedActivity.visibility);
        break;
    }
  }

  private generateID(location: string,selection: string) {
    return location+selection;
  }

  private activityDataModifier(data: Promise<Line[]>): Promise<Line[]>  {
    let value = this.selectedActivity.value;

    if (value.timeOfWeek == undefined && value.timeOfDay == undefined) 
      return data.then(d=>this.fc.filterByActivity(d));
  
    if (value.timeOfWeek != undefined && value.timeOfDay != undefined) {
      let period = value.timeOfWeek.var_name+value.timeOfDay.var_name;
      return data.then(d=>this.fc.filterByPeriod(d,period));
    }

    if (value.timeOfWeek != undefined && value.timeOfDay == undefined)
      return data.then(d=>this.fc.filterByWeek(d,value.timeOfWeek.var_name));
    
    if (value.timeOfWeek == undefined && value.timeOfDay != undefined) 
      return data.then(d=>this.fc.filterByDay(d,value.timeOfDay.var_name));
    
  }
}
