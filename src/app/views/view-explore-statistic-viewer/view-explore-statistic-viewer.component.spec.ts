import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExploreStatisticViewerComponent } from './view-explore-statistic-viewer.component';

describe('ViewExploreStatisticViewerComponent', () => {
  let component: ViewExploreStatisticViewerComponent;
  let fixture: ComponentFixture<ViewExploreStatisticViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExploreStatisticViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExploreStatisticViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
