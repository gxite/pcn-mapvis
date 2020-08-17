import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private heartlandLocation = new BehaviorSubject(null);
  currentHeartlandLocation = this.heartlandLocation.asObservable();

  constructor() { }

  setHeartlandLocation(location: string) {
    this.heartlandLocation.next(location);
  }
}
