import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetDepreciationAssetComponent } from './add-asset-depreciation-asset.component';

describe('AddAssetDepreciationAssetComponent', () => {
  let component: AddAssetDepreciationAssetComponent;
  let fixture: ComponentFixture<AddAssetDepreciationAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetDepreciationAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetDepreciationAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
