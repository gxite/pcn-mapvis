import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private locations = new BehaviorSubject([]);
  currentLocation = this.locations.asObservable();

  private timeOfDay = new BehaviorSubject("");
  currentTimeOfDay = this.timeOfDay.asObservable();

  constructor() { }

  setHeartlandLocation(locations: string[]) {
    this.locations.next(locations);
  }

  setCurrentTimeOfDay(timeOfDay: string) {
    this.timeOfDay.next(timeOfDay);
  }
}
