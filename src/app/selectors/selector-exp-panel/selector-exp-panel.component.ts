import { Component, Input, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatSelect } from '@angular/material';

import { SelectionService, Layer} from 'src/app/services/selection.service';
import { HeartlandSettings,} from 'src/app/panoSettings';
import { localType } from 'src/app/services/database.service';

@Component({
  selector: 'app-selector-exp-panel',
  templateUrl: './selector-exp-panel.component.html',
  styleUrls: ['./selector-exp-panel.component.scss']
})
export class SelectorExpPanelComponent implements OnInit {

  selectedColorHex: string;
  selectedColorRGB: number[];
  selectedValuesList: Object = {};
  selectedValueAlias: string;
  heartland = new HeartlandSettings();

  //states
  expanded: boolean = false;
  slider: Object = {value: 1, min: 0.2,max:3,step:0.1};
  visibility: boolean = true;
  disabled: boolean = true;

  //subscriptions
  currentLocations: string[]
  layer;

  @Input() formFields;
  @Input() colors; //colour list
  @Input() selectorType: localType; //activities or features

  //provides access to all MatSelects
  @ViewChildren(MatSelect) selectDropdowns: QueryList<MatSelect>;

  constructor(
    private selectionService: SelectionService,) {}

  ngOnInit() {
    this.selectionService.currentLocations.subscribe(locations => this.currentLocations = locations);

    switch(this.selectorType) {
      case "activities": this.selectionService.currentActivities.subscribe(layer=> this.layer = layer);break;
      case "features": this.selectionService.currentFeatures.subscribe(layer=> this.layer = layer);break;
    }
  }

  isVisible() {
    if (this.visibility) {return "visibility";}
    else {return "visibility_off";}
  }

  toggleVisibility() {
    this.visibility = !this.visibility;
  }

  reset() {
    this.selectDropdowns.forEach(select=> select.value = null);
    this.expanded = false;
    this.selectedValueAlias = null;
    this.selectedColorHex = null;
    this.selectedColorRGB = null;
    this.selectedValuesList={};
    this.update();
  }
  
  setColor(fieldName: string) {
    //setColor takes in other fieldNames when configured as activities selectorType
    if (fieldName != "activities" && fieldName != "features") return; 

    if(this.selectedValuesList[fieldName]!=undefined) { 
      if (this.colors[this.selectedValuesList[fieldName].name]) {
        let selectedColor = this.colors[this.selectedValuesList[fieldName].name];
        this.selectedColorHex = selectedColor.hex;
        this.selectedColorRGB = selectedColor.rgb;
      }
    } 
    else {
      this.selectedColorHex = null;
      this.selectedColorRGB = null;
      this.selectedValueAlias=null;
    }
  }

  setAlias(value: string) {
    if (value != "activities" && value != "features") return
    if(this.selectedValuesList[value]!=undefined) 
      this.selectedValueAlias = this.selectedValuesList[value].alias;
  }

  setTimeslotFieldOptions(field: string, options) {
    if (field != "timeslot") return options;
    if (!this.selectedValuesList["timeOfDay"]) return;
    if (this.currentLocations == []) return;

    let validTimeslots;

    if (this.currentLocations[0] == "punggol" || this.currentLocations[0] == "alexandra"){
      if (this.selectedValuesList["timeOfDay"].name == "m"){
        validTimeslots = this.heartland.timeslot2.Morning;
        return options.filter(timeslot => validTimeslots.includes(timeslot.name));
      }
      if (this.selectedValuesList["timeOfDay"].name == "e"){
        validTimeslots = this.heartland.timeslot2.Evening;
        return options.filter(timeslot => validTimeslots.includes(timeslot.name));
      }
    }
    else{
      if (this.selectedValuesList["timeOfDay"].name == "m"){
        validTimeslots = this.heartland.timeslot1.Morning;
        return options.filter(timeslot => validTimeslots.includes(timeslot.name));
      }
      if (this.selectedValuesList["timeOfDay"].name == "e"){
        validTimeslots = this.heartland.timeslot1.Evening;
        return options.filter(timeslot => validTimeslots.includes(timeslot.name));
      }
    }
  }

  isDisabled(fieldName:string): boolean{
    if (fieldName == "features" || fieldName == "activities" ) return false;
    if (!this.selectedValuesList["activities"]) return true;
  }

  checkIfLoading() {
    if (!this.layer) return false;
    return this.layer.loading;
  }

  update() {
    this.flushUndefinedValues();
    this.setSelections();
  }

  private flushUndefinedValues() {
    Object.keys(this.selectedValuesList).forEach(
      key => {
        if(this.selectedValuesList[key] == undefined)
          delete this.selectedValuesList[key];
      }
    );
  }

  private setSelections(): void {
    let layerSelections: Layer;
    switch(this.selectorType){
      case"features":
        layerSelections= this.buildLayerSelection("features"); 
        this.selectionService.setFeatures(layerSelections);break;
      case "activities": 
        layerSelections= this.buildLayerSelection("activities"); 
        this.selectionService.setActivities(layerSelections);break;
    } 
  }

  private buildLayerSelection(layerType: localType): Layer {
    return {
      value: this.selectedValuesList, 
      layerType: layerType, 
      color: this.selectedColorRGB, 
      visibility: this.visibility, 
      lineScale: this.slider["value"], 
      loading:null
    };
  }
}
