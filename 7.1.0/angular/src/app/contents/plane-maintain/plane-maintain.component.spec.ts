import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneMaintainComponent } from './plane-maintain.component';

describe('PlaneMaintainComponent', () => {
  let component: PlaneMaintainComponent;
  let fixture: ComponentFixture<PlaneMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaneMaintainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
