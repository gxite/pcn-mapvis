import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiActivitiesSelectorComponent } from './ui-activities-selector.component';

describe('UiActivitiesSelectorComponent', () => {
  let component: UiActivitiesSelectorComponent;
  let fixture: ComponentFixture<UiActivitiesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiActivitiesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiActivitiesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
