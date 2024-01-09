import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactUsComponent } from './contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsComponent, ValidationMessagesComponent],
      imports: [HttpClientModule, ReactiveFormsModule], 
      providers: [FormBuilder]
    });
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
