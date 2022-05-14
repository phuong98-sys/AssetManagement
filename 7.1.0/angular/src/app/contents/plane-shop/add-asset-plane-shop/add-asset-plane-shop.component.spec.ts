import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetPlaneShopComponent } from './add-asset-plane-shop.component';

describe('AddAssetPlaneShopComponent', () => {
  let component: AddAssetPlaneShopComponent;
  let fixture: ComponentFixture<AddAssetPlaneShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetPlaneShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetPlaneShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
