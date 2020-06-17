import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { Line } from "../map";

1
@Component({
  selector: 'app-mapvis',
  templateUrl: './mapvis.component.html',
  styleUrls: ['./mapvis.component.scss']
})
export class MapvisComponent implements OnInit {

  mapboxSelector :string = "map";
  deckSelector :string = "deck-canvas"; 

  featureLayerNum :number = 2;
  maxFeatureNum :number = 7;
  step :number = 1;

  activityLayerNum :number = 0;
  maxActivityNum :number = 7;
    
  constructor(private mapService: MapService) { }

  ngOnInit() {
    //this.mapService.buildMap(this.mapboxSelector,this.deckSelector);
  }

  setLocation($event) {
    //event is an array. [Promise<Line[]>,string]
    let selectedFeature = $event[1]
    let linePromise = $event[0]
    this.mapService.addLocation(linePromise,selectedFeature);
    this.mapService.render();
  }

  array(n :number) {
    let array = [];
    for(let i=1; i<=n; i++) {
      array.push(i);
    }
    return array;
  }

  generateID(type :string,num : number) {
    return type + "_" +num.toString();
  }

  testReset() {
    this.mapService.reset();
  }
}
