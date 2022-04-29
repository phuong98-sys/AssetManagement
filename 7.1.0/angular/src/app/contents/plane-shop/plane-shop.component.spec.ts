import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneShopComponent } from './plane-shop.component';

describe('PlaneShopComponent', () => {
  let component: PlaneShopComponent;
  let fixture: ComponentFixture<PlaneShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaneShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
