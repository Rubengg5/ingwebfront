import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaVistaComponent } from './mapa-vista.component';

describe('MapaVistaComponent', () => {
  let component: MapaVistaComponent;
  let fixture: ComponentFixture<MapaVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaVistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
