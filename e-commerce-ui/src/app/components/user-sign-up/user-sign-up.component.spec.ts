import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignUpComponent } from './user-sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserSignUpComponent', () => {
  let component: UserSignUpComponent;
  let fixture: ComponentFixture<UserSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSignUpComponent, ValidationMessagesComponent],
      imports: [HttpClientModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(UserSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
