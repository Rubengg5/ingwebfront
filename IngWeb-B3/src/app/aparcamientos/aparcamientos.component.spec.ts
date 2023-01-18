import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AparcamientosComponent } from './aparcamientos.component';

describe('AparcamientosComponent', () => {
  let component: AparcamientosComponent;
  let fixture: ComponentFixture<AparcamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AparcamientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AparcamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
