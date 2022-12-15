import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XDetailsComponent } from './x-details.component';

describe('XDetailsComponent', () => {
  let component: XDetailsComponent;
  let fixture: ComponentFixture<XDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
