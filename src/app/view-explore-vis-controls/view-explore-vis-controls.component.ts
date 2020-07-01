import { Component, OnInit } from '@angular/core';
import { IslandSettings, NameAlias } from '../panoSettings';

@Component({
  selector: 'app-view-explore-vis-controls',
  templateUrl: './view-explore-vis-controls.component.html',
  styleUrls: ['./view-explore-vis-controls.component.scss']
})
export class ViewExploreVisControlsComponent implements OnInit {

  island = new IslandSettings();
  locations: NameAlias[] = this.island.locations;

  constructor() {}

  ngOnInit() {
  }

}
