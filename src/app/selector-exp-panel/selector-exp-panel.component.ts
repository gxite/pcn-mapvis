import { Component, Input, OnInit } from '@angular/core';

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
    if (this.colors[this.selectedValue.var_name]) {
      this.selectedColor = this.colors[this.selectedValue.var_name].hex;
    }
  }

  setAlias() {
    this.selectedValueAlias = this.selectedValue.var_alias;
  }
}
