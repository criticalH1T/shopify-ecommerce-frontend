import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent, Type } from './modal.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ModalDataService } from '../../services/modal-data.service';
import { CamelCaseToSpacePipe } from 'src/app/pipes/camel-case-to-space.pipe';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';

describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let component: ModalComponent;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent, CamelCaseToSpacePipe, ValidationMessagesComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder, ModalDataService],
    });

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    // Initialize necessary properties
    component.modalTitle = 'Test Modal';
    component.data = {}; 
    component.type = Type.RECIPE; 
    component.products = []; 
    
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed for your specific use case
});
