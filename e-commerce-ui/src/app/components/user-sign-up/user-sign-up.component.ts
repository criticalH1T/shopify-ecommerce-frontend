import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../services/helper.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss']
})
export class UserSignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private helperService: HelperService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\-']*$/), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\-']*$/), Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[A-Za-z0-9\s,.'-]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.helperService.passwordValidator]],
      reEnterPassword: ['', [Validators.required, this.helperService.passwordValidator, this.matchPasswords.bind(this)]]
    })
  }

  private matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = this.signupForm?.get('password')?.value;
    const reEnterPassword = control.value;
    if (password !== reEnterPassword) {
      return {passwordsNotMatch: true};
    }
    return null;
  }

  onSubmit() {
    this.authenticationService.setRegistration(this.signupForm.value).subscribe(data => {
      if (data.statusCode === 200) {
        this.router.navigate(['/sign-in']);
        alert(data.responseMessage)
      }
    });
  }
}
