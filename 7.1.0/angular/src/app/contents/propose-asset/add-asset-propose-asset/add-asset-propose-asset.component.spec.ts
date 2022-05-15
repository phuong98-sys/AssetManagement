import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetProposeAssetComponent } from './add-asset-propose-asset.component';

describe('AddAssetProposeAssetComponent', () => {
  let component: AddAssetProposeAssetComponent;
  let fixture: ComponentFixture<AddAssetProposeAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetProposeAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetProposeAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
