import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiEndpointsService} from "../../services/api-endpoints.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactUsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private apiEndpointsService: ApiEndpointsService) {
  }

  ngOnInit(): void {
    this.contactUsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\- ']*$/), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', [Validators.required, Validators.maxLength(1000)]]
    })
  }

  onSubmit() {
    this.apiEndpointsService.createContact(this.contactUsForm.value).subscribe(
      response => {
        if (response.status === 200) {
          window.alert("Comment sent successfully!")
        } else {
          window.alert(response.responseMessage);
        }
      }
    );
  }

}
