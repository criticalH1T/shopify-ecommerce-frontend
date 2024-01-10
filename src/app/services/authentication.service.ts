import {BehaviorSubject, Observable, tap, throwError} from "rxjs";

export interface UserSignIn {
  email: string,
  password: string
}

export interface UserSignUp {
  firstName: string,
  lastName: string,
  address: string,
  email: string,
  password: string
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {ApiEndpointsService} from "./api-endpoints.service";
import {EncryptionService} from "./encryption.service";
import {StateService} from "./state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerApiUrl: string = "http://localhost:8080/register";
  private authenticateApiUrl: string = "http://localhost:8080/authenticate";
  private IS_ADMIN: string = 'isAdmin';
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private apiEndpointsService: ApiEndpointsService,
              private encryptionService: EncryptionService,
              private stateService: StateService) { }

  setRegistration(signUpInfo: UserSignUp): Observable<any> {
    return this.http.post(this.registerApiUrl, signUpInfo).pipe(
      catchError(err => this.catchAuthenticationError(err))
    );
  }

  setAuthentication(signInInfo: UserSignIn): Observable<any> {
    return this.http.post(this.authenticateApiUrl, signInInfo, {withCredentials: true}).pipe(
      tap(() => {
        this.checkIsAdmin();
      }),
      catchError(err => this.catchAuthenticationError(err))
    );
  }

  // if a user is an admin user, this info is saved to localstorage it allow certain UI elements exclusive to admins
  checkIsAdmin() {
    this.apiEndpointsService.isAdmin().subscribe(
      isAdmin => {
        isAdmin ? this.isAdmin.next(true) : this.isAdmin.next(false);
        const encryptedInfo = isAdmin ? this.encryptionService.encryptData('true')
          : this.encryptionService.encryptData('false');
        this.stateService.setLocalStorageItem(this.IS_ADMIN, encryptedInfo);
      }
    )
  }

  catchAuthenticationError(error): Observable<Response> {
    if(error && error.error && error.error.message) {
      alert(error.error.message)
    } else if (error && error.message) {
      alert(error.message)
    }
    return throwError(error)
  }

  logOutUser() {
    sessionStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('isAdmin');
    this.apiEndpointsService.logOutUser().subscribe(
      response => {
        if(response.status === 200) {
          window.alert('You have been logged out.');
        }
      }
    )
  }
}
