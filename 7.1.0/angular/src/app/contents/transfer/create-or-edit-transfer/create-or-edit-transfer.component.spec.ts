import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditTransferComponent } from './create-or-edit-transfer.component';

describe('CreateOrEditTransferComponent', () => {
  let component: CreateOrEditTransferComponent;
  let fixture: ComponentFixture<CreateOrEditTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
