import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { localCategory } from './database.service';
 
@Injectable({
  providedIn: 'root'
})
export class ExploreStateService {

  private state = new BehaviorSubject<localCategory>("island"); //default

  currentState = this.state.asObservable();

  constructor() {  }

  setExploreState(exploreState: localCategory) {
    this.state.next(exploreState);
  }
}
