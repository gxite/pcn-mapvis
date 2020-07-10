import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TooltipComponent } from './tooltip/tooltip.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { ViewExploreComponent } from './views/view-explore/view-explore.component';
import { ViewAboutComponent } from './views/view-about/view-about.component';
import { ViewExploreVisControlsComponent } from './views/view-explore-vis-controls/view-explore-vis-controls.component';
import { SelectorTilesComponent } from 'src/app/selectors/selector-tiles/selector-tiles.component';
import { SelectorExpPanelComponent } from 'src/app/selectors/selector-exp-panel/selector-exp-panel.component';

import { StatisticsModule } from 'src/app/statistics/statistics.module';
import { ViewExploreStatisticViewerComponent } from './views/view-explore-statistic-viewer/view-explore-statistic-viewer.component';
import { DisplayHistogramExpPanelComponent } from './display-histogram-exp-panel/display-histogram-exp-panel.component';

const appRoutes: Routes = [
  { path: 'view-about', component: ViewAboutComponent },
  { path: 'view-explore', component: ViewExploreComponent },
  { path: '',   redirectTo: '/view-explore', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TooltipComponent,
    MenuBarComponent,
    ViewExploreComponent,
    ViewAboutComponent,
    ViewExploreVisControlsComponent,
    SelectorTilesComponent,
    SelectorExpPanelComponent,
    ViewExploreStatisticViewerComponent,
    DisplayHistogramExpPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatDividerModule,
    MatSliderModule,
    MatTabsModule,
    CdkTableModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    StatisticsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
