import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorExpPanelComponent } from './selector-exp-panel.component';

describe('SelectorExpPanelComponent', () => {
  let component: SelectorExpPanelComponent;
  let fixture: ComponentFixture<SelectorExpPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorExpPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorExpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
