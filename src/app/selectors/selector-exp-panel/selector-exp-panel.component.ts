import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
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

    }else {
      this.selected.emit(null);
    }
  }

  reset() {
    this.selectedValues ={};
    this.selectedValueAlias="";
    this.selectedColor="";
    this.expanded = false;
  }
}
