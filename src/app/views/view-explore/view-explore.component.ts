import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { INNER_WIDTH_THRESHOLD } from 'src/app/panoSettings';
//import { ViewExploreStatisticViewerComponent } from '../view-explore-statistic-viewer/view-explore-statistic-viewer.component';

@Component({
  selector: 'app-view-explore',
  templateUrl: './view-explore.component.html',
  styleUrls: ['./view-explore.component.scss']
})
export class ViewExploreComponent implements OnInit {

  mapboxSelector: string = "map";
  deckSelector: string = "deck-canvas";
  mapService: MapService; //variable to allow the mapService instance to be bounded and passed to child 
  
  //@ViewChild(ViewExploreStatisticViewerComponent,null) statsViewer: ViewExploreStatisticViewerComponent;

  constructor(private ms: MapService) { }

  ngOnInit() {
    this.mapService = this.ms;
    this.mapService.buildMap(this.mapboxSelector,this.deckSelector); 
  }

  toHide() {
    return window.innerWidth < INNER_WIDTH_THRESHOLD ? true : false;
  }

  onSelection($event) {
    let line =$event[0]; 
    let selection = $event[1];
    let data = line.map(d=>d.properties[selection]);
    //this.statsViewer.setHistPanel(data);
  }

  resetMap() {
    this.mapService.resetMapState();
  }
}
