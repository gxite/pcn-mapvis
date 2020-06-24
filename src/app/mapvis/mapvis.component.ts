import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-mapvis',
  templateUrl: './mapvis.component.html',
  styleUrls: ['./mapvis.component.scss'],  
})
export class MapvisComponent implements OnInit {

  mapboxSelector: string = "map";
  deckSelector: string = "deck-canvas"; 

  featureLayerNum: number = 1;
  maxFeatureNum: number = 7;
  step: number = 1;

  activityLayerNum: number = 1;
  maxActivityNum: number = 7;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapService.buildMap(this.mapboxSelector,this.deckSelector);
  }

  setLocation(layerType:string,$event) {
    //event is an array. [Promise<Line[]>,string,string]
    let linePromise = $event[0];
    let selected = $event[1];
    let selectorID = $event[2];
    if (layerType == "Feature") {
      this.mapService.addFeature(linePromise,selected,selectorID);
    }
    else if (layerType == "Activity") { //emits [promise,string,string,string,string]
      let timeOfWeek = $event[3];
      let timeOfDay= $event[4];
      let timeslot = $event[5];
      this.mapService.addActivity(linePromise,selected,selectorID,timeOfWeek,timeOfDay,timeslot);
    }
    this.mapService.render();
  }

  array(n :number) {
    let array = [];
    for(let i=1; i<=n; i++) { array.push(i);}
    return array;
  }

  generateID(type :string,num : number) {return type + "_" +num.toString();}

  onChangeFeatureLayersNum() {
    this.mapService.updateLayerStates("Feature",this.featureLayerNum);
    this.mapService.render();
  }

  onChangeActivityLayersNum() {
    this.mapService.updateLayerStates("Activity",this.activityLayerNum);
    this.mapService.render();
  }
}
