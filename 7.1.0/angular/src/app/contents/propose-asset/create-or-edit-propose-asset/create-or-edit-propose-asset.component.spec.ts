import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditProposeAssetComponent } from './create-or-edit-propose-asset.component';

describe('CreateOrEditProposeAssetComponent', () => {
  let component: CreateOrEditProposeAssetComponent;
  let fixture: ComponentFixture<CreateOrEditProposeAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditProposeAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditProposeAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
