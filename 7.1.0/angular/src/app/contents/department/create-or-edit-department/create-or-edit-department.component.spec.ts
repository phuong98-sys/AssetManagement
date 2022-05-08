import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditDepartmentComponent } from './create-or-edit-department.component';

describe('CreateOrEditDepartmentComponent', () => {
  let component: CreateOrEditDepartmentComponent;
  let fixture: ComponentFixture<CreateOrEditDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
