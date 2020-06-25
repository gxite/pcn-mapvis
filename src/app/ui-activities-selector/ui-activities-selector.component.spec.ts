import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIActivitiesSelectorComponent } from './ui-activities-selector.component';

describe('UIActivitiesSelectorComponent', () => {
  let component: UIActivitiesSelectorComponent;
  let fixture: ComponentFixture<UIActivitiesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIActivitiesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIActivitiesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
