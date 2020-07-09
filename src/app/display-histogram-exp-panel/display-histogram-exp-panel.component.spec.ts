import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHistogramExpPanelComponent } from './display-histogram-exp-panel.component';

describe('DisplayHistogramExpPanelComponent', () => {
  let component: DisplayHistogramExpPanelComponent;
  let fixture: ComponentFixture<DisplayHistogramExpPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayHistogramExpPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayHistogramExpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
