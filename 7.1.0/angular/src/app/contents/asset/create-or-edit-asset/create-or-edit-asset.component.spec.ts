import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditAssetComponent } from './create-or-edit-asset.component';

describe('CreateOrEditAssetComponent', () => {
  let component: CreateOrEditAssetComponent;
  let fixture: ComponentFixture<CreateOrEditAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
