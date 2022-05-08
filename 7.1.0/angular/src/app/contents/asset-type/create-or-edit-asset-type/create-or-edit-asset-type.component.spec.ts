import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditAssetTypeComponent } from './create-or-edit-asset-type.component';

describe('CreateOrEditAssetTypeComponent', () => {
  let component: CreateOrEditAssetTypeComponent;
  let fixture: ComponentFixture<CreateOrEditAssetTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditAssetTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditAssetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
