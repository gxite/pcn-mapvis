import { Component, OnInit, ViewChildren, QueryList} from '@angular/core';
import { IslandSettings, HeartlandSettings, NameAlias } from 'src/app/panoSettings';


import { FeatureCollection} from "src/app/panoFeatureCollection";
import { SelectorTilesComponent } from 'src/app/selectors/selector-tiles/selector-tiles.component';
import { SelectorExpPanelComponent } from 'src/app/selectors/selector-exp-panel/selector-exp-panel.component';

import { SelectionService} from 'src/app/services/selection.service';
import { DatabaseService, localCategory } from 'src/app/services/database.service';
import { ExploreStateService } from "src/app/services/explore-state.service";
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-view-explore-vis-controls',
  templateUrl: './view-explore-vis-controls.component.html',
  styleUrls: ['./view-explore-vis-controls.component.scss']
})
export class ViewExploreVisControlsComponent implements OnInit {

  @ViewChildren('selectorTiles') children_selectorTiles: QueryList<SelectorTilesComponent>;
  @ViewChildren('selectorExpPanel') children_selectorExpPanel: QueryList<SelectorExpPanelComponent>;

  fc = new FeatureCollection;

  //variables for binding to selector components
  island = new IslandSettings();
  islandLocations: NameAlias[] = this.island.locations;
  islandFeatureFormFields= this.island.featureFormFields.map(field=>this.appendOptions(this.island,field));
  islandActivityFormFields= this.island.activityFormFields.map(field=>this.appendOptions(this.island,field)); 
  islandColors= this.island.color;
  heartland = new HeartlandSettings();
  heartlandLocations: NameAlias[] = this.heartland.locations;
  heartlandFeatureFormFields= this.heartland.featureFormFields.map(field=>this.appendOptions(this.heartland,field)); 
  heartlandActivityFormFields= this.heartland.activityFormFields.map(field=>this.appendOptions(this.heartland,field)); 
  heartlandColors= this.heartland.color;
  
  //subsrciptions
  selectedLocations: string[] = [];
  currentExploreState: localCategory;

  constructor(
    private selectionService: SelectionService,
    private exploreStateService: ExploreStateService,
    private databaseService: DatabaseService,
    private mapService: MapService) {}

  ngOnInit(){
    this.exploreStateService.currentState.subscribe(state => this.currentExploreState = state);
    this.selectionService.currentLocations.subscribe(l=> {this.selectedLocations=l;this.update()});
  }

  toggleExploreState(selectedIndex: number) {
    switch (selectedIndex) {
      case 0: this.exploreStateService.setExploreState("island"); break;
      case 1: this.exploreStateService.setExploreState("heartland"); break;
    }
    this.update();
    this.resetAllStates();
  }

  resetAllStates() {
    this.children_selectorTiles.forEach(c=>c.reset());
    this.children_selectorExpPanel.forEach(c=>c.reset());
    this.selectionService.clearSelections();
    this.mapService.resetMapState();
    this.databaseService.clearCache();
  }

  update() { 
    this.mapService.clearLayerState();
    this.mapService.render();
  }

  //selects the corresponding option list and adds to the object
  private appendOptions(mode,field: NameAlias) {
    field["var_options"] = mode[field.name];
    return field;
  }

}
