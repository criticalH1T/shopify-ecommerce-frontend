import {Observable, throwError} from "rxjs";

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

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerApiUrl: string = "http://localhost:8080/api/v1/auth/register";
  private authenticateApiUrl: string = "http://localhost:8080/api/v1/auth/authenticate";

  constructor(private http: HttpClient) { }

  setRegistration(signUpInfo: UserSignUp): Observable<any> {
    return this.http.post(this.registerApiUrl, signUpInfo).pipe(
      catchError(err => this.catchAuthenticationError(err))
    );
  }

  setAuthentication(signInInfo: UserSignIn): Observable<any> {
    return this.http.post(this.authenticateApiUrl, signInInfo).pipe(
      catchError(err => this.catchAuthenticationError(err))
    );
  }

  catchAuthenticationError(error): Observable<Response> {
    if(error && error.error && error.error.message) {
      alert(error.error.message)
    } else if (error && error.message) {
      alert(error.message)
    }
    return throwError(error)
  }
}
