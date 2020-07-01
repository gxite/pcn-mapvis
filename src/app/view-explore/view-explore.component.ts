import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-view-explore',
  templateUrl: './view-explore.component.html',
  styleUrls: ['./view-explore.component.scss']
})
export class ViewExploreComponent implements OnInit {

  mapboxSelector: string = "map";
  deckSelector: string = "deck-canvas";

  constructor(private mapService: MapService,private databaseService: DatabaseService) { }

  ngOnInit() {
    //this.mapService.buildMap(this.mapboxSelector,this.deckSelector);
    //this.databaseService.fetchData("panoAction","parkFeatures","ecp1").then(data=>console.log(data));
  }
}
