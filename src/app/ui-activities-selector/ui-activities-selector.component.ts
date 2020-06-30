import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import * as pano from '../panoSettings';
import { FeatureCollection, Line } from "../panoFeatureCollection";
import { DatabaseService } from '../database.service';
import * as ss from "simple-statistics";

@Component({
  selector: 'app-ui-activities-selector',
  templateUrl: './ui-activities-selector.component.html',
  styleUrls: ['./ui-activities-selector.component.scss']
})
export class UIActivitiesSelectorComponent implements OnInit {

  panoLocations:string[] = pano.locations;
  panoActivities: string[] = pano.activities;
  panoLayerType: Object = pano.layerTypes;
  panoTimeOfWeek: Object = pano.timeOfWeek;
  panoTimeOfDay: Object = pano.timeOfDay;
  panoTimeslot: string[];
  fc = new FeatureCollection;

  selectedLocation: string;
  selectedActivity: string;
  selectedTimeOfDay: string;
  selectedTimeOfWeek: string;
  selectedTimeslot: string;
  selectedColor: string;

  activity_disabled: boolean = true;
  timeslot_disabled: boolean = true;
  visible: boolean = true;
  newFetch: boolean = false;

  data_line : Promise<Line[]>;

  @Input() selectorID: string;
  @Input() properties: Promise<number[]>;
  @Output() selection = new EventEmitter();
  @Output() type :string = "Activity";

  //Descriptive stats
  max: Promise<number>;
  min: Promise<number>;
  mean: Promise<number>;
  mode: Promise<number>;
  median: Promise<number>;
  stddev: Promise<number>;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  public fetchLocationData() {
    if (this.selectedLocation != undefined) {
      this.data_line = this.databaseService.getLocationData(this.selectedLocation,this.panoLayerType[this.type])
      .then(data=>this.fc.transformToLine(data));
    }
    this.newFetch = true;
  }

  public update() {
    if (this.selectedLocation) {
      this.activity_disabled = false;

      if (this.selectedTimeOfWeek && this.selectedTimeOfDay) {
        this.timeslot_disabled = false;
        this.setTimeslot();
      }
      if (this.selectedActivity) {
        this.selectedColor= pano.colors[this.selectedActivity].hex;
      }
    }
    else {
      this.activity_disabled = true;
      this.timeslot_disabled =true;
      this.selectedActivity = null;
      this.selectedTimeOfWeek = null;
      this.selectedTimeOfDay = null;
      this.selectedColor = null;
    }

    if (this.selectedLocation && this.selectedActivity) {
        this.selection.emit([
          this.data_line,//promise
          this.selectedActivity,
          this.selectorID,
          this.selectedTimeOfWeek,
          this.selectedTimeOfDay,
          this.selectedTimeslot,
          this.visible,
          this.newFetch
          ]); 
        this.newFetch = false;
    }
  }

  public setTimeslot() {
    this.panoTimeslot = this.selectedLocation != "punggol" && this.selectedLocation != "alexandra" ? 
      pano.timeslot1[this.selectedTimeOfDay] : pano.timeslot2[this.selectedTimeOfDay];
  }

  public getLocation() {
    if (this.selectedLocation) {
      return this.selectedLocation.toUpperCase();
    }
    else {
      return "";
    }
  }

  public getActivity() {
    if (this.selectedActivity) {
      return this.selectedActivity;
    }
    else {
      return "";
    }
  }

  public onTabChange() {
    if (this.selectedLocation && this.selectedActivity && (this.selectedTimeOfWeek || this.selectedTimeOfDay)) {
      this.max = this.properties.then(data=>ss.max(data));
      this.min = this.properties.then(data=>ss.min(data));
      this.mean = this.properties.then(data=>ss.mean(data));
      this.mode = this.properties.then(data=>ss.mode(data));
      this.median = this.properties.then(data=>ss.median(data));
      this.stddev = this.properties.then(data=>ss.standardDeviation(data));
    }
  }

  public isVisible() {
    if (this.visible) {
      return "visibility";
    }
    else {
      return "visibility_off"
    }
  }

  public toggleVisibility() {
    this.visible = !this.visible;
  }
}
