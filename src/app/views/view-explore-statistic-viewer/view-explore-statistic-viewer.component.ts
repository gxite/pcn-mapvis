import { Component, OnInit, ViewChild, } from '@angular/core';
import { DisplayHistogramExpPanelComponent } from 'src/app/display-histogram-exp-panel/display-histogram-exp-panel.component';

@Component({
  selector: 'app-view-explore-statistic-viewer',
  templateUrl: './view-explore-statistic-viewer.component.html',
  styleUrls: ['./view-explore-statistic-viewer.component.scss']
})
export class ViewExploreStatisticViewerComponent implements OnInit {
  @ViewChild(DisplayHistogramExpPanelComponent,null) histPanel: DisplayHistogramExpPanelComponent;

  constructor() { }

  ngOnInit() {
  }

  setHistPanel(data) {
    this.histPanel.buildHistogram(data);
  }

}
