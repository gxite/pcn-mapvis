import { Component, Input, OnInit, Output, EventEmitter,ViewChildren, QueryList } from '@angular/core';
import { MatSelect } from '@angular/material';
import { SelectionService } from 'src/app/services/selection.service';
import { HeartlandSettings } from 'src/app/panoSettings';

@Component({
  selector: 'app-selector-exp-panel',
  templateUrl: './selector-exp-panel.component.html',
  styleUrls: ['./selector-exp-panel.component.scss']
})
export class SelectorExpPanelComponent implements OnInit {

  selectedColor;
  selectedValues = {};
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
  @Input() colors;
  @Output() selected = new EventEmitter();
  @Output() visible = new EventEmitter();
  @Output() lineScale = new EventEmitter();

  @ViewChildren(MatSelect) selectDropdowns: QueryList<MatSelect>;

  heartland = new HeartlandSettings();
  locationList: string[];

  constructor(private selectionService: SelectionService) { }

  ngOnInit() {
    this.selectionService.currentLocation.subscribe(locations => this.locationList = locations);
  }

  isVisible() {
    if (this.visibility) {return "visibility";}
    else {return "visibility_off";}
  }

  toggleVisibility() {
    this.visibility = !this.visibility;
    this.visibilityChanged = true;
  }

  clearFields() {
    this.selectDropdowns.forEach(select=> select.value = null);
    this.selectedValueAlias = null;
    this.selectedColor=null;
    this.selectedValues={};
    this.update();
  }

  setSelectedChanged() {
    this.selectedChanged = true;
  }

  setScaleChanged() {
    this.scaleChanged = true;
  }
  
  setColor(value: string) {
    if(this.selectedValues[value]!=undefined) { 
      if (this.colors[this.selectedValues[value].var_name]) {
        this.selectedColor = this.colors[this.selectedValues[value].var_name].hex;
      }
    } else {
      this.selectedColor=null;
      this.selectedValueAlias=null;
    }
  }

  setAlias(value: string) {
    if (value == "activities" || value == "features") {
      if(this.selectedValues[value]!=undefined) {
        this.selectedValueAlias = this.selectedValues[value].var_alias;
      }
    }
  }

  setTimeslotFieldOptions(field: string, options) {
    if (field != "timeslot") return options;
    if (!this.selectedValues["timeOfDay"]) return;

    let validTimeslots;

    if (this.locationList[0] == "punggol" || this.locationList[0] == "alexandra"){
      if (this.selectedValues["timeOfDay"].var_name == "m"){
        validTimeslots = this.heartland.timeslot2.Morning;
        return options.filter(timeslot => validTimeslots.includes(timeslot.var_name));
      }
      if (this.selectedValues["timeOfDay"].var_name == "e"){
        validTimeslots = this.heartland.timeslot2.Evening;
        return options.filter(timeslot => validTimeslots.includes(timeslot.var_name));
      }
    }
    else{
      if (this.selectedValues["timeOfDay"].var_name == "m"){
        validTimeslots = this.heartland.timeslot1.Morning;
        return options.filter(timeslot => validTimeslots.includes(timeslot.var_name));
      }
      if (this.selectedValues["timeOfDay"].var_name == "e"){
        validTimeslots = this.heartland.timeslot1.Evening;
        return options.filter(timeslot => validTimeslots.includes(timeslot.var_name));
      }
    }
  }

  private flushUndefinedValues() {
    Object.keys(this.selectedValues).forEach(key=> {if(this.selectedValues[key] == undefined){delete this.selectedValues[key]}});
  }

  update() {
    this.flushUndefinedValues();
    if(Object.keys(this.selectedValues).length !== 0 && this.selectedValues.constructor === Object) {
      if (this.selectedChanged) {
        this.selected.emit(this.selectedValues);
        this.selectedChanged = false;
      }
      if (this.visibilityChanged) {
        this.visible.emit(this.visibility);
        this.visibilityChanged = false;
      }
      if (this.scaleChanged) {
        this.lineScale.emit(this.scaleValue);
        this.scaleChanged = false;
      }
    }
    else {
      this.selected.emit(null);
    }
  }

  reset() {
    this.selectedValues ={};
    this.selectedValueAlias="";
    this.selectedColor="";
    this.expanded = false;
    this.visibilityChanged = true;
  }
}
