import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMaintainComponent } from './plan-maintain.component';

describe('PlanMaintainComponent', () => {
  let component: PlanMaintainComponent;
  let fixture: ComponentFixture<PlanMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanMaintainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
