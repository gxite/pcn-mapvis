import { Component, Input, OnInit, Output, EventEmitter,ViewChildren, QueryList } from '@angular/core';
import { MatSelect } from '@angular/material';

import { SelectionService, Selector, Layer} from 'src/app/services/selection.service';
import { ExploreStateService } from 'src/app/services/explore-state.service';
import { HeartlandSettings, NameAlias } from 'src/app/panoSettings';

import { panoCategory } from 'src/app/services/database.service';

@Component({
  selector: 'app-selector-exp-panel',
  templateUrl: './selector-exp-panel.component.html',
  styleUrls: ['./selector-exp-panel.component.scss']
})
export class SelectorExpPanelComponent implements OnInit {

  selectedColorHex;
  selectedColorRGB;

  selectedValuesList = {};
  selectedValueAlias: string;
  selectedChanged: boolean = true;

  visibility: boolean = true;
  visibilityChanged = true; //starter case

  scaleValue: number = 1;
  scaleMin: number = 0.2;
  scaleMax: number = 3;
  scaleStep: number = 0.1;
  scaleChanged: boolean = true;

  expanded: boolean;

  @Input() formFields;
  @Input() colors; //colour list
  @Input() selectorType; //activities or features

  //to be removed
  @Output() selected = new EventEmitter();
  @Output() visible = new EventEmitter();
  @Output() lineScale = new EventEmitter();

  //provides access to all MatSelects
  @ViewChildren(MatSelect) selectDropdowns: QueryList<MatSelect>;

  heartland = new HeartlandSettings();

  currentLocations: string[]

  constructor(
    private selectionService: SelectionService,) { 
      this.selectionService.currentLocations.subscribe(locations => this.currentLocations = locations);
  }

  ngOnInit() {}

  isVisible() {
    if (this.visibility) {return "visibility";}
    else {return "visibility_off";}
  }

  toggleVisibility() {
    this.visibility = !this.visibility;
    this.visibilityChanged = true;
  }

  reset() {
    this.selectDropdowns.forEach(select=> select.value = null);
    this.expanded = false;
    this.visibilityChanged = true;
    this.selectedValueAlias = null;
    this.selectedColorHex = null;
    this.selectedColorRGB = null;
    this.selectedValuesList={};
    this.update();
  }

  setSelectedChanged() {
    this.selectedChanged = true;
  }

  setScaleChanged() {
    this.scaleChanged = true;
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
    if (value == "activities" || value == "features") {
      if(this.selectedValuesList[value]!=undefined) {
        this.selectedValueAlias = this.selectedValuesList[value].alias;
      }
    }
  }

  setTimeslotFieldOptions(field: string, options) {
    if (field != "timeslot") return options;
    if (!this.selectedValuesList["timeOfDay"]) return;

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

  private flushUndefinedValues() {
    Object.keys(this.selectedValuesList).forEach(key=> {if(this.selectedValuesList[key] == undefined){delete this.selectedValuesList[key]}});
  }

  private setSelections(): void {
    let selected: Selector = {value: this.selectedValuesList, visibility: this.visibility, lineScale: this.scaleValue, loading:null};

    let layerSelections: Layer;

    switch(this.selectorType){
      case"features":
        layerSelections = {value: this.selectedValuesList, layerType: "parkFeatures", color: this.selectedColorRGB, visibility: this.visibility, lineScale: this.scaleValue, loading:null}; 
        this.selectionService.setFeatures(layerSelections );break;
      case "activities": 
        layerSelections = {value: this.selectedValuesList, layerType: "parkActivities", color: this.selectedColorRGB, visibility: this.visibility, lineScale: this.scaleValue, loading:null}; 
        this.selectionService.setActivities(selected);break;
    } 
  }

  update() {
    this.flushUndefinedValues();
    if(Object.keys(this.selectedValuesList).length !== 0 && this.selectedValuesList.constructor === Object) {
      if (this.selectedChanged) {
        this.selected.emit(this.selectedValuesList);// to be removed
        this.setSelections();
        this.selectedChanged = false;
      }
      if (this.visibilityChanged) {
        this.visible.emit(this.visibility); // to be removed
        this.setSelections();
        this.visibilityChanged = false;
      }
      if (this.scaleChanged) {
        this.lineScale.emit(this.scaleValue); // to be removed 
        this.setSelections();
        this.scaleChanged = false;
      }
    }
    else {
      this.selected.emit(null);
    }
  }
}
