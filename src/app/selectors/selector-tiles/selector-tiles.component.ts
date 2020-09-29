import { Component, OnInit, Input, Output, ViewChild, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material';
import { SelectionService } from 'src/app/services/selection.service';

@Component({
  selector: 'app-selector-tiles',
  templateUrl: './selector-tiles.component.html',
  styleUrls: ['./selector-tiles.component.scss']
})
export class SelectorTilesComponent implements OnInit {

  @ViewChild(MatButtonToggleGroup,null) group: MatButtonToggleGroup;
  @ViewChildren(MatButtonToggle) toggles: QueryList<MatButtonToggle>;

  @Input() tileList: [];
  @Input() allowMultiple: boolean;

  @Output() selected = new EventEmitter();

  currentLocations: string[];
  checked: boolean;

  constructor(private selectionService: SelectionService) { }

  ngOnInit() {
    this.selectionService.currentLocations.subscribe(locations => this.currentLocations = locations);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.toggles.forEach(toggle => {toggle.buttonToggleGroup = this.group});
    });
  }

  setChecked(checked: boolean) {
    this.checked = checked;
  }

  isChecked(checked: boolean) {
    if (checked) 
      this.toggles.forEach(toggle => {toggle.checked = toggle.checked ? true : true});
    else 
      this.toggles.forEach(toggle => {toggle.checked = toggle.checked ? false : false});
  }

  update(selection: string[]) {
    if (!Array.isArray(selection)) {
      if (selection == null) this.selectionService.setLocations([]); 
      else this.selectionService.setLocations([selection]);
    }
    else this.selectionService.setLocations(selection);
  }

  reset() {
    this.toggles.forEach(toggle => {toggle.checked = toggle.checked ? false : false});
  }
}
