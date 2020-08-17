import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

  selectedValueAlias;
  visibility: boolean = true;
  visibilityChanged = true; //starter case
  selectedChanged = true;
  expanded;

  @Input() formFields;
  @Input() colors;
  @Output() selected = new EventEmitter();
  @Output() visible = new EventEmitter();

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

  setSelectedChanged() {
    this.selectedChanged = true;
  }
  
  setColor(value: string) {
    if(this.selectedValues[value]!=undefined) { 
      if (this.colors[this.selectedValues[value].var_name]) {
        this.selectedColor = this.colors[this.selectedValues[value].var_name].hex;
      }
    } else {
      this.selectedColor="";
      this.selectedValueAlias="";
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
