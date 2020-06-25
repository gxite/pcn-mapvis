import { Component, OnInit, Output, Input, EventEmitter  } from '@angular/core';

import * as pano from '../pano-settings';
import { FeatureCollection, Line } from "../pano-data";
import { DatabaseService } from '../database.service';
import { from } from 'rxjs';
import * as ss from "simple-statistics";

@Component({
  selector: 'app-ui-features-selector',
  templateUrl: './ui-features-selector.component.html',
  styleUrls: ['./ui-features-selector.component.scss']
})
export class UIFeaturesSelectorComponent implements OnInit {

  panoLocations :string[] = pano.locations;
  panoFeatures :string[] = pano.features;
  panoLayerType: Object = pano.layerTypes;
  fc = new FeatureCollection;

  selectedLocation: string;
  selectedFeature: string;
  selectedColor: string;
  feature_disabled: boolean = true;

  data_line : Promise<Line[]>;

  @Input() selectorID: string;
  @Input() properties: Promise<number[]>;
  @Output() selection = new EventEmitter();
  @Output() type :string = "Feature";

  //Descriptive stats
  max: Promise<number>;
  min: Promise<number>;
  mean: Promise<number>;
  mode: Promise<number>;
  median: Promise<number>;
  stddev: Promise<number>;

  constructor(private databaseService: DatabaseService) {}

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
      this.feature_disabled = false;
      if (this.selectedFeature) {
        this.selectedColor = pano.colors[this.selectedFeature].hex;
      }
    }
    else {
      this.feature_disabled = true;
      this.selectedFeature = null;
      this.selectedColor = null;
    }
    if (this.selectedLocation && this.selectedFeature) {
      this.selection.emit([this.data_line,this.selectedFeature,this.selectorID]); //emits [promise,string,string]
    }
  }

  public getLocation() {
    if (this.selectedLocation) {
      return this.selectedLocation.toUpperCase();
    }
    else {
      return "";
    }
  }

  public getFeature() {
    if (this.selectedFeature) {
      return this.selectedFeature;
    }
    else {
      return "";
    }
  }

  public onTabChange() {
    if (this.selectedLocation && this.selectedFeature) {
      this.max = this.properties.then(data=>ss.max(data));
      this.min = this.properties.then(data=>ss.min(data));
      this.mean = this.properties.then(data=>ss.mean(data));
      this.mode = this.properties.then(data=>ss.mode(data));
      this.median = this.properties.then(data=>ss.median(data));
      this.stddev = this.properties.then(data=>ss.standardDeviation(data));
    }
  }
}
