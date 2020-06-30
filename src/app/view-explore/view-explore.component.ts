import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';


@Component({
  selector: 'app-view-explore',
  templateUrl: './view-explore.component.html',
  styleUrls: ['./view-explore.component.scss']
})
export class ViewExploreComponent implements OnInit {

  mapboxSelector: string = "map";
  deckSelector: string = "deck-canvas";

  constructor(private mapService: MapService) { }

  ngOnInit() {
    //this.mapService.buildMap(this.mapboxSelector,this.deckSelector);
  }

}
