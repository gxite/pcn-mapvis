import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selector-exp-panel',
  templateUrl: './selector-exp-panel.component.html',
  styleUrls: ['./selector-exp-panel.component.scss']
})
export class SelectorExpPanelComponent implements OnInit {

  selectedColor;
  selectedValue;
  selectedValueAlias;
  visible: boolean = true;

  @Input() formFields;
  @Input() colors;
  @Output() selected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  isVisible() {
    if (this.visible) {return "visibility";}
    else {return "visibility_off";}
  }

  toggleVisibility() {
    this.visible = !this.visible;
  }

  setColor() {
    if(this.selectedValue!=undefined) { 
      if (this.colors[this.selectedValue.var_name]) {
        this.selectedColor = this.colors[this.selectedValue.var_name].hex;
      }
    } else {
      this.selectedColor="";
      this.selectedValueAlias="";
    }
  }

  setAlias() {
    if(this.selectedValue!=undefined) {
      this.selectedValueAlias = this.selectedValue.var_alias;
    }
  }

  update() {
    if(this.selectedValue!=undefined) {
      this.selected.emit(this.selectedValue.var_name);
    }else {
      this.selected.emit(null);
    }
  }
}
