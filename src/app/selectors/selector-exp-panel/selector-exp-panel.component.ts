import { Component, Input, OnInit, Output, EventEmitter,ViewChildren, QueryList } from '@angular/core';
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

  selectedValuesList = {};
  selectedValueAlias: string;

  visibility: boolean = true;

  scaleValue: number = 1;
  scaleMin: number = 0.2;
  scaleMax: number = 3;
  scaleStep: number = 0.1;

  expanded: boolean;
  disabled: boolean = true;

  @Input() formFields;
  @Input() colors; //colour list
  @Input() selectorType: localType; //activities or features

  //to be removed
  @Output() selected = new EventEmitter();
  @Output() visible = new EventEmitter();
  @Output() lineScale = new EventEmitter();
  //-----------------------

  //provides access to all MatSelects
  @ViewChildren(MatSelect) selectDropdowns: QueryList<MatSelect>;

  heartland = new HeartlandSettings();

  currentLocations: string[]
  layer;

  constructor(
    private selectionService: SelectionService,) { 
      this.selectionService.currentLocations.subscribe(locations => this.currentLocations = locations);
  }

  ngOnInit() {
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
    if (fieldName != "activities" && fieldName != "features") return; //setColor takes in other fieldNames when configured as activities selectorType 
    if(this.selectedValuesList[fieldName]!=undefined) { 
      if (this.colors[this.selectedValuesList[fieldName].name]) {
        let selectedColor = this.colors[this.selectedValuesList[fieldName].name];
        this.selectedColorHex = selectedColor.hex;
        this.selectedColorRGB = selectedColor.rgb;
      }
    } else {
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

  //to be migrated to another class
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

  private flushUndefinedValues() {
    Object.keys(this.selectedValuesList).forEach(key=> {if(this.selectedValuesList[key] == undefined){delete this.selectedValuesList[key]}});
  }

  private setSelections(): void {
    let layerSelections: Layer;
    switch(this.selectorType){
      case"features":
        layerSelections = {value: this.selectedValuesList, layerType: "features", color: this.selectedColorRGB, visibility: this.visibility, lineScale: this.scaleValue, loading:null}; 
        this.selectionService.setFeatures(layerSelections);break;
      case "activities": 
        layerSelections = {value: this.selectedValuesList, layerType: "activities", color: this.selectedColorRGB, visibility: this.visibility, lineScale: this.scaleValue, loading:null}; 
        this.selectionService.setActivities(layerSelections);break;
    } 
  }

  update() {
    this.flushUndefinedValues();
    if(Object.keys(this.selectedValuesList).length !== 0 && this.selectedValuesList.constructor === Object) {

      this.selected.emit(this.selectedValuesList);
      this.visible.emit(this.visibility); 
      this.lineScale.emit(this.scaleValue);
      //this.setSelections();
    }
    else {
      this.selected.emit(null);
    }
  }
}
