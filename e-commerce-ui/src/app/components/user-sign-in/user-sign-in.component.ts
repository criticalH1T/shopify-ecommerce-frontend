import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSubmit() {
    this.subscriptions.push(this.authenticationService.setAuthentication(this.signupForm.value).subscribe(data => {
      if (data.statusCode === 200) {
        this.router.navigate(['/home']);
        alert(data.responseMessage);
        window.sessionStorage.setItem('isUserLoggedIn', true.toString());
      }
    }));
  }

}
