import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapvisComponent } from './mapvis/mapvis.component';
import { UIFeaturesSelectorComponent } from './ui-features-selector/ui-features-selector.component';
import { UIActivitiesSelectorComponent } from './ui-activities-selector/ui-activities-selector.component';
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
import { ViewExploreComponent } from './view-explore/view-explore.component';
import { ViewAboutComponent } from './view-about/view-about.component';
import { ViewExploreVisControlsComponent } from './view-explore-vis-controls/view-explore-vis-controls.component';
import { SelectorTilesComponent } from './selector-tiles/selector-tiles.component';
import { SelectorExpPanelComponent } from './selector-exp-panel/selector-exp-panel.component';

const appRoutes: Routes = [
  { path: 'view-about', component: ViewAboutComponent },
  { path: 'view-explore', component: ViewExploreComponent },
  { path: '',   redirectTo: '/view-explore', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    MapvisComponent,
    UIFeaturesSelectorComponent,
    UIActivitiesSelectorComponent,
    TooltipComponent,
    MenuBarComponent,
    ViewExploreComponent,
    ViewAboutComponent,
    ViewExploreVisControlsComponent,
    SelectorTilesComponent,
    SelectorExpPanelComponent,
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
