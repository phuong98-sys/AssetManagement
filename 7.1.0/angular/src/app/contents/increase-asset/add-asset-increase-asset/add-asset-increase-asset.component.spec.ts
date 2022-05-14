import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetIncreaseAssetComponent } from './add-asset-increase-asset.component';

describe('AddAssetIncreaseAssetComponent', () => {
  let component: AddAssetIncreaseAssetComponent;
  let fixture: ComponentFixture<AddAssetIncreaseAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetIncreaseAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetIncreaseAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
