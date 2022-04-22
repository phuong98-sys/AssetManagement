import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseAssetComponent } from './increase-asset.component';

describe('IncreaseAssetComponent', () => {
  let component: IncreaseAssetComponent;
  let fixture: ComponentFixture<IncreaseAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncreaseAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
