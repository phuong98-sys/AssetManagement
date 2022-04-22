import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditIncreaseAssetComponent } from './create-or-edit-increase-asset.component';

describe('CreateOrEditIncreaseAssetComponent', () => {
  let component: CreateOrEditIncreaseAssetComponent;
  let fixture: ComponentFixture<CreateOrEditIncreaseAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditIncreaseAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditIncreaseAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
