import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../services/helper.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string = '';
  jwtToken: string = '';

  constructor(private formBuilder: FormBuilder,
              private helperService: HelperService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.authenticationService.setAuthentication(this.signupForm.value).subscribe({
        next: value => {
          this.jwtToken = value.token;
          window.sessionStorage.clear();
          window.sessionStorage.setItem('userToken', this.jwtToken);
        }
      }
    );
  }

}
