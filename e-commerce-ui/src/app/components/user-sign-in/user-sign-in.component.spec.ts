import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { UserSignInComponent } from './user-sign-in.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserSignInComponent', () => {
  let component: UserSignInComponent;
  let fixture: ComponentFixture<UserSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSignInComponent, ValidationMessagesComponent],
      providers: [AuthenticationService, HttpClient],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
