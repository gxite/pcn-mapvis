import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import * as pano from '../pano-settings';
import { FeatureCollection, Line } from "../map";
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-ui-activities-selector',
  templateUrl: './ui-activities-selector.component.html',
  styleUrls: ['./ui-activities-selector.component.scss']
})
export class UIActivitiesSelectorComponent implements OnInit {

  panoLocations :string[] = pano.locations;
  panoActivities :string[] = pano.activities;
  panoLayerType: Object = pano.layerTypes;
  panoTimeOfWeek :Object = pano.timeOfWeek;
  panoTimeOfDay :Object = pano.timeOfDay;
  panoTimeslot: string[];
  fc = new FeatureCollection;

  selectedLocation: string;
  selectedActivity: string;
  selectedTimeOfDay: string;
  selectedTimeOfWeek: string;
  selectedTimeslot: string;

  activity_disabled: boolean = true;
  timeslot_disabled: boolean = true;

  data_line : Promise<Line[]>;

  @Input() selectorID: string;
  @Output() selection = new EventEmitter();
  @Output() type :string = "Activity";

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  public fetchLocationData() {
    if (this.selectedLocation != undefined) {
      this.data_line = this.databaseService.getLocationData(this.selectedLocation,this.panoLayerType[this.type])
      .then(data=>this.fc.transformToLine(data));
    }
  }

  public update() {
    if (this.selectedLocation) {
      this.activity_disabled = false;
      if (this.selectedTimeOfWeek && this.selectedTimeOfDay) {
        this.timeslot_disabled = false;
        this.setTimeslot();
      }
    }
    else {
      this.activity_disabled = true;
      this.timeslot_disabled =true;
      this.selectedActivity = null;
      this.selectedTimeOfWeek = null;
      this.selectedTimeOfDay = null;
    }

    if (this.selectedLocation && this.selectedActivity && this.selectedTimeOfWeek && this.selectedTimeOfDay  && this.selectedTimeslot) {
      /* this.selection.emit([this.data_line,this.selectedActivity,this.selectorID]); //---for testing */
      this.selection.emit([
        this.data_line,
        this.selectedActivity,
        this.selectorID,
        this.selectedTimeOfWeek,
        this.selectedTimeOfDay,
        this.selectedTimeslot
        ]); //emits [promise,string,string,string,string]
    }
  }

  public setTimeslot() {
    this.panoTimeslot = this.selectedLocation != "punggol" && this.selectedLocation != "alexandra" ? 
      pano.timeslot1[this.selectedTimeOfDay] : pano.timeslot2[this.selectedTimeOfDay];
  }

  public getTitle() {
    if (this.selectedLocation) {
      return this.selectedLocation;
    }
    else {
      return this.selectorID;
    }
  }

}
