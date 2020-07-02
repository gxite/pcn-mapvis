import { Component, OnInit } from '@angular/core';
import { IslandSettings, HeartlandSettings, NameAlias } from '../panoSettings';

@Component({
  selector: 'app-view-explore-vis-controls',
  templateUrl: './view-explore-vis-controls.component.html',
  styleUrls: ['./view-explore-vis-controls.component.scss']
})
export class ViewExploreVisControlsComponent implements OnInit {

  //modes
  island = new IslandSettings();
  heartland = new HeartlandSettings();
  
  islandLocations: NameAlias[] = this.island.locations;
  islandFeatureFormFields= this.island.featureFormFields.map(field=>this.appendOptions(this.island,field)); 
  islandActivityFormFields= this.island.activityFormFields.map(field=>this.appendOptions(this.island,field)); 
  islandColors= this.island.color;

  heartlandLocations: NameAlias[] = this.heartland.locations;

  constructor() {}

  ngOnInit() {
  }

  appendOptions(mode,field: NameAlias) {//selects the corresponding option list and adds to the object
    field["var_options"] = mode[field.var_name];
    return field;
  }

  test(tabID: Tab, selection: string[]) { 
    console.log(this.islandActivityFormFields)
  }
}

type Tab = "Island" | "Heartland";