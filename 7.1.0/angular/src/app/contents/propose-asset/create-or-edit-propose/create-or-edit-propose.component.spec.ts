import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditProposeComponent } from './create-or-edit-propose.component';

describe('CreateOrEditProposeComponent', () => {
  let component: CreateOrEditProposeComponent;
  let fixture: ComponentFixture<CreateOrEditProposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditProposeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditProposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
