import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetSuggestionHandlingComponent } from './add-asset-suggestion-handling.component';

describe('AddAssetSuggestionHandlingComponent', () => {
  let component: AddAssetSuggestionHandlingComponent;
  let fixture: ComponentFixture<AddAssetSuggestionHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetSuggestionHandlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetSuggestionHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
