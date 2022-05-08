import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionHandlingComponent } from './suggestion-handling.component';

describe('SuggestionHandlingComponent', () => {
  let component: SuggestionHandlingComponent;
  let fixture: ComponentFixture<SuggestionHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionHandlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
