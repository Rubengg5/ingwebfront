import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AparcamientosCreateComponent } from './aparcamientos-create.component';

describe('AparcamientosCreateComponent', () => {
  let component: AparcamientosCreateComponent;
  let fixture: ComponentFixture<AparcamientosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AparcamientosCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AparcamientosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
