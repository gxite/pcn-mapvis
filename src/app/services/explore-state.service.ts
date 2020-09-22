import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { MasterSettings,NameAlias } from 'src/app/panoSettings'
 
@Injectable({
  providedIn: 'root'
})
export class ExploreStateService {

  private state = new BehaviorSubject( MasterSettings.exploreStates[0]); //default

  currentState = this.state.asObservable();

  constructor() {  }

  setExploreState(exploreState: NameAlias) {
    this.state.next(exploreState);
  }
}
