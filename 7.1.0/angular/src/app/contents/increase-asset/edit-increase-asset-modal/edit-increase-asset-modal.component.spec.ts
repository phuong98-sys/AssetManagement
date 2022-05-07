import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncreaseAssetModalComponent } from './edit-increase-asset-modal.component';

describe('EditIncreaseAssetModalComponent', () => {
  let component: EditIncreaseAssetModalComponent;
  let fixture: ComponentFixture<EditIncreaseAssetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIncreaseAssetModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIncreaseAssetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
