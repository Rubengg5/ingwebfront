import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XCreateComponent } from './x-create.component';

describe('XCreateComponent', () => {
  let component: XCreateComponent;
  let fixture: ComponentFixture<XCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
