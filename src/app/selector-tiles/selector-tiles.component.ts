import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material';

@Component({
  selector: 'app-selector-tiles',
  templateUrl: './selector-tiles.component.html',
  styleUrls: ['./selector-tiles.component.scss']
})
export class SelectorTilesComponent implements OnInit {
  @ViewChild(MatButtonToggleGroup,null) group: MatButtonToggleGroup;
  @ViewChildren(MatButtonToggle) toggles: QueryList<MatButtonToggle>;

  @Input() tileList: [];
  checkAll: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.toggles.forEach(toggle => {toggle.buttonToggleGroup = this.group});
    });
  }

  test(a) {
    console.log(a);
  }

  isChecked() {
      this.toggles.forEach(toggle => {toggle.checked = !toggle.checked});
  }

  resetCheckAll() {
    console.log(this.checkAll)
  }

}
