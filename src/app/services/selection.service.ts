/* Description: Keeps track the current menu selection states. 
                Contains methods to access and set states.
*/

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { NameAlias, ColorPair } from '../panoSettings';
import { Line} from "src/app/panoFeatureCollection";

import { ExploreStateService } from './explore-state.service';
import { DatabaseService, panoType, panoCategory } from 'src/app/services/database.service';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private locations = new BehaviorSubject<string[]>([]);
  private features = new BehaviorSubject<Selector>({value: null, visibility: null, lineScale: null, loading:null});
  private activities = new BehaviorSubject<Selector>({value: null, visibility: null, lineScale: null, loading:null});

  currentLocations = this.locations.asObservable();
  currentFeatures = this.features.asObservable();
  currentActivities = this.activities.asObservable();

  currentExploreState: NameAlias;
  databaseCategory: panoCategory;

  constructor(
    private exploreStateService: ExploreStateService,
    private mapService: MapService,
    private databaseService: DatabaseService) {
      this.exploreStateService.currentState.subscribe(state => this.currentExploreState = state);
      this.exploreStateService.currentState.subscribe(state => 
        this.databaseCategory  = this.databaseService.getDatabaseCategory(state.name))
   }

  setLocations(locations: string[]) {
    this.locations.next(locations);
  }

  setFeatures(features: Selector) {
    this.features.next(features);
  }

  setActivities(activities: Selector) {
    console.log(this.activities.value)
    this.activities.next(activities);
  }

  private updateLayerStates(){
    //runs every user interaction to check and update state
    //***this is to be optimised later to only update the changed layersState 
    //instead of clearing all and repopulate

    this.mapService.clearLayerState();

    //for every location in locations
    this.locations.value.map(location=>{

        
        if (this.features.value != null) {
          this.fetchAndPush(this.databaseCategory,"parkFeatures",location);
        }
        if (this.activities.value != null) {
          this.fetchAndPush(this.databaseCategory,"parkActivities",location);
        }
        

      })


    //this.mapService.render();
  }

  private fetchAndPush(category:panoCategory,type: panoType,location: string) {
    //fetch the data from the DatabaseService
    let dataSrc: Promise<Line[]> = this.databaseService.fetchData(category,type,location).then(data =>{
      //loading controls
      //viewport zoom controls
      return data;
    });
    //then push to the layersState list within MapService
/*     this.mapService.addToLayersStateList(
      dataSrc,
      this.features.value.value,
      this.features.value.,
    ) */
  }


}

export interface Layer {value: Object; layerType: panoType; color: ColorPair; visibility: boolean; lineScale: number; loading:boolean};

//to be removed
export interface Selector {value: any; visibility: boolean; lineScale: number; loading:boolean};
