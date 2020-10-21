import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { INNER_WIDTH_THRESHOLD } from 'src/app/panoSettings';
import { SelectionService } from 'src/app/services/selection.service';
import { ViewExploreVisControlsComponent} from '../view-explore-vis-controls/view-explore-vis-controls.component';
@Component({
  selector: 'app-view-explore',
  templateUrl: './view-explore.component.html',
  styleUrls: ['./view-explore.component.scss']
})
export class ViewExploreComponent implements OnInit {

  mapboxSelector: string = "map";
  deckSelector: string = "deck-canvas";

  leftDrawerOpened: boolean = true;
  rightDrawerOpened: boolean = false;

  @ViewChild('visControls',null) visControl: ViewExploreVisControlsComponent;

  constructor(private mapService: MapService,private selectionService: SelectionService) { }

  ngOnInit() {
    this.mapService.buildMap(this.mapboxSelector,this.deckSelector); 
  }

  isMobile() {
    return (window.innerWidth < INNER_WIDTH_THRESHOLD ? true : false) 
  }

  resetMap() {
    this.mapService.resetMapState();
    this.selectionService.clearSelections(); 
    this.visControl.resetAllStates();
  }
}
