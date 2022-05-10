import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreciationAssetComponent } from './depreciation-asset.component';

describe('DepreciationAssetComponent', () => {
  let component: DepreciationAssetComponent;
  let fixture: ComponentFixture<DepreciationAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepreciationAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepreciationAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
