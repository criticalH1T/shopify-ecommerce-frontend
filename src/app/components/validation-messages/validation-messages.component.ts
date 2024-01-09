import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss'],
})
export class ValidationMessagesComponent {
  @Input() control: AbstractControl;

  getErrorKeys(): string[] {
    return Object.keys(this.control.errors || {});
  }

  getErrorMessage(errorKey: string): string {
    const errors = {
      required: 'Field is required.',
      email: 'Invalid email format.',
      invalidPassword:
        'Password must contain at least 8 characters, including a number and a capital letter.',
      maxlength: 'Exceeding max length for field.',
      pattern: 'Invalid characters.',
      passwordsNotMatch: 'The passwords do not match.',
    };

    return errors[errorKey] || 'Unknown error';
  }
}
