import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditReduceAssetComponent } from './create-or-edit-reduce-asset.component';

describe('CreateOrEditReduceAssetComponent', () => {
  let component: CreateOrEditReduceAssetComponent;
  let fixture: ComponentFixture<CreateOrEditReduceAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditReduceAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditReduceAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
