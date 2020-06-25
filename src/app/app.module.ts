import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapvisComponent } from './mapvis/mapvis.component';
import { UIFeaturesSelectorComponent } from './ui-features-selector/ui-features-selector.component';
import { UIActivitiesSelectorComponent } from './ui-activities-selector/ui-activities-selector.component';
import { TooltipComponent } from './tooltip/tooltip.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    MapBoxComponent,
    MapvisComponent,
    UIFeaturesSelectorComponent,
    UIActivitiesSelectorComponent,
    TooltipComponent,
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
    CdkTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
