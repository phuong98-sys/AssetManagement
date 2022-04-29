import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeAssetComponent } from './propose-asset.component';

describe('ProposeAssetComponent', () => {
  let component: ProposeAssetComponent;
  let fixture: ComponentFixture<ProposeAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposeAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
