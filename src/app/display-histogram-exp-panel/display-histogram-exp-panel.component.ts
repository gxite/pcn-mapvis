import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HistogramComponent } from '../statistics/histogram/histogram.component';

@Component({
  selector: 'app-display-histogram-exp-panel',
  templateUrl: './display-histogram-exp-panel.component.html',
  styleUrls: ['./display-histogram-exp-panel.component.scss']
})
export class DisplayHistogramExpPanelComponent implements OnInit {

  @ViewChild(HistogramComponent,null) histComp: HistogramComponent; 
  first;

  constructor() { }
  
  ngOnInit() {
    this.first=true;
  }

  buildHistogram(data) {
    if (this.first){
      this.histComp.build(data);
      this.first = false;
    }
    else {
      this.histComp.clear();
      this.histComp.build(data);
    }
  }
}
