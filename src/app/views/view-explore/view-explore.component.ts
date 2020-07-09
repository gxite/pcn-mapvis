import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { INNER_WIDTH_THRESHOLD } from 'src/app/panoSettings';

@Component({
  selector: 'app-view-explore',
  templateUrl: './view-explore.component.html',
  styleUrls: ['./view-explore.component.scss']
})
export class ViewExploreComponent implements OnInit {

  mapboxSelector: string = "map";
  deckSelector: string = "deck-canvas";
  mapService: MapService; //variable to allow the mapService instance to be bounded and passed to child 

  constructor(private ms: MapService) { }

  ngOnInit() {
    this.mapService = this.ms;
    this.mapService.buildMap(this.mapboxSelector,this.deckSelector); 
  }

  toHide() {
    return window.innerWidth < INNER_WIDTH_THRESHOLD ? true : false;
  }
}
