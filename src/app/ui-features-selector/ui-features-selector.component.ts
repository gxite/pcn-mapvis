import { Component, OnInit, Output, Input, EventEmitter  } from '@angular/core';

import * as pano from '../pano-settings';
import { FeatureCollection, Line } from "../map";
import { DatabaseService } from '../database.service';


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
  feature_disabled: boolean = true;

  data_line : Promise<Line[]>;

  @Input() selectorID: string;
  @Output() selection = new EventEmitter();
  @Output() type :string = "Feature";


  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
  }

  public fetchLocationData() {
    if (this.selectedLocation != undefined) {
      this.data_line = this.databaseService.getLocationData(this.selectedLocation,this.panoLayerType["features"])
      .then(data=>this.fc.transformToLine(data));
      this.feature_disabled = false;
    }
  }

  public update() {
    if (this.selectedLocation && this.selectedFeature) {
      this.selection.emit([this.data_line,this.selectedFeature]); //emits [promise,string]
    }
  }

}
