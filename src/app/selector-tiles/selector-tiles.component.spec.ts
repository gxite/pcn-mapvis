import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorTilesComponent } from './selector-tiles.component';

describe('SelectorTilesComponent', () => {
  let component: SelectorTilesComponent;
  let fixture: ComponentFixture<SelectorTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
