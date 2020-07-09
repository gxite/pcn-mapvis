import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExploreVisControlsComponent } from './view-explore-vis-controls.component';

describe('ViewExploreVisControlsComponent', () => {
  let component: ViewExploreVisControlsComponent;
  let fixture: ComponentFixture<ViewExploreVisControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExploreVisControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExploreVisControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
