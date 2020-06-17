import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapvisComponent } from './mapvis.component';

describe('MapvisComponent', () => {
  let component: MapvisComponent;
  let fixture: ComponentFixture<MapvisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapvisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
