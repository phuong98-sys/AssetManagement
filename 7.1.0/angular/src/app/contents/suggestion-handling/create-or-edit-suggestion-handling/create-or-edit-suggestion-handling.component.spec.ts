import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditSuggestionHandlingComponent } from './create-or-edit-suggestion-handling.component';

describe('CreateOrEditSuggestionHandlingComponent', () => {
  let component: CreateOrEditSuggestionHandlingComponent;
  let fixture: ComponentFixture<CreateOrEditSuggestionHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditSuggestionHandlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditSuggestionHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
