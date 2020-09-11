/* Description: Keeps track the current menu selection states. 
                Contains methods to access and set states.
*/

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { NameAlias } from '../panoSettings';
import { ExploreStateService } from './explore-state.service';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private locations = new BehaviorSubject([]);
  private timeOfDay = new BehaviorSubject("");

  private timeOfWeek = new BehaviorSubject("");

  currentLocation = this.locations.asObservable();
  currentTimeOfDay = this.timeOfDay.asObservable();

  currentExploreState: NameAlias;

  constructor(private exploreState: ExploreStateService) {
    this.exploreState.currentState.subscribe(state => this.currentExploreState = state);
   }

  setHeartlandLocation(locations: string[]) {
    this.locations.next(locations);
  }

  setCurrentTimeOfDay(timeOfDay: string) {
    this.timeOfDay.next(timeOfDay);
  }
}
