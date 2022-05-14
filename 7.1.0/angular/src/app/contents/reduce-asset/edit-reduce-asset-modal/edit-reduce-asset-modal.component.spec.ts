import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReduceAssetModalComponent } from './edit-reduce-asset-modal.component';

describe('EditReduceAssetModalComponent', () => {
  let component: EditReduceAssetModalComponent;
  let fixture: ComponentFixture<EditReduceAssetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReduceAssetModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReduceAssetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
