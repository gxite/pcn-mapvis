import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExploreStatisticsViewerComponent } from './view-explore-statistics-viewer.component';

describe('ViewExploreStatisticsViewerComponent', () => {
  let component: ViewExploreStatisticsViewerComponent;
  let fixture: ComponentFixture<ViewExploreStatisticsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExploreStatisticsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExploreStatisticsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
