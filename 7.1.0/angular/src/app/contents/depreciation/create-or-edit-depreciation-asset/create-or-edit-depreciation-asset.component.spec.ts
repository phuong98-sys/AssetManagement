import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditDepreciationAssetComponent } from './create-or-edit-depreciation-asset.component';

describe('CreateOrEditDepreciationAssetComponent', () => {
  let component: CreateOrEditDepreciationAssetComponent;
  let fixture: ComponentFixture<CreateOrEditDepreciationAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditDepreciationAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditDepreciationAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
