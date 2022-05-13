import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditPlaneShopComponent } from './create-or-edit-plane-shop.component';

describe('CreateOrEditPlaneShopComponent', () => {
  let component: CreateOrEditPlaneShopComponent;
  let fixture: ComponentFixture<CreateOrEditPlaneShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditPlaneShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditPlaneShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
