import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetReduceAssetComponent } from './add-asset-reduce-asset.component';

describe('AddAssetReduceAssetComponent', () => {
  let component: AddAssetReduceAssetComponent;
  let fixture: ComponentFixture<AddAssetReduceAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetReduceAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetReduceAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
