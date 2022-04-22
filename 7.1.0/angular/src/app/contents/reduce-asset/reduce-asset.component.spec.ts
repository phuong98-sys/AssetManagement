import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduceAssetComponent } from './reduce-asset.component';

describe('ReduceAssetComponent', () => {
  let component: ReduceAssetComponent;
  let fixture: ComponentFixture<ReduceAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReduceAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduceAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
