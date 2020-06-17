import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIFeaturesSelectorComponent } from './ui-features-selector.component';

describe('UIFeaturesSelectorComponent', () => {
  let component: UIFeaturesSelectorComponent;
  let fixture: ComponentFixture<UIFeaturesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIFeaturesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIFeaturesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
