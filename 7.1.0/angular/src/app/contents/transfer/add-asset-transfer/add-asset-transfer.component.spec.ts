import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetTransferComponent } from './add-asset-transfer.component';

describe('AddAssetTransferComponent', () => {
  let component: AddAssetTransferComponent;
  let fixture: ComponentFixture<AddAssetTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
