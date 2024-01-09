import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationMessagesComponent } from './validation-messages.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('ValidationMessagesComponent', () => {
  let fixture: ComponentFixture<ValidationMessagesComponent>;
  let component: ValidationMessagesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationMessagesComponent],
      imports: [ReactiveFormsModule],
    });

    const control = new FormControl('');
    fixture = TestBed.createComponent(ValidationMessagesComponent);
    component = fixture.componentInstance;
    component.control = control;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display error messages when control is not touched', () => {
    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement).toBeFalsy();
  });

  it('should return correct error message for "required"', () => {
    const errorMessage = component.getErrorMessage('required');
    expect(errorMessage).toBe('Field is required.');
  });

  it('should return correct error message for "email"', () => {
    const errorMessage = component.getErrorMessage('email');
    expect(errorMessage).toBe('Invalid email format.');
  });

  it('should return correct error message for "invalidPassword"', () => {
    const errorMessage = component.getErrorMessage('invalidPassword');
    expect(errorMessage).toBe(
      'Password must contain at least 8 characters, including a number and a capital letter.'
    );
  });

  it('should return correct error message for "maxlength"', () => {
    const errorMessage = component.getErrorMessage('maxlength');
    expect(errorMessage).toBe('Exceeding max length for field.');
  });

  it('should return correct error message for "pattern"', () => {
    const errorMessage = component.getErrorMessage('pattern');
    expect(errorMessage).toBe('Invalid characters.');
  });

  it('should return correct error message for "passwordsNotMatch"', () => {
    const errorMessage = component.getErrorMessage('passwordsNotMatch');
    expect(errorMessage).toBe('The passwords do not match.');
  });

  it('should return "Unknown error" for unknown error key', () => {
    const errorMessage = component.getErrorMessage('unknownKey');
    expect(errorMessage).toBe('Unknown error');
  });
});
