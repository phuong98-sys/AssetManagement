import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditPlaneMaintainComponent } from './create-or-edit-plane-maintain.component';

describe('CreateOrEditPlaneMaintainComponent', () => {
  let component: CreateOrEditPlaneMaintainComponent;
  let fixture: ComponentFixture<CreateOrEditPlaneMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditPlaneMaintainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditPlaneMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
