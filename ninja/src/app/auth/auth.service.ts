import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  user = new BehaviorSubject<User>(null);

  endpoints = {
    signin: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.googleAPIKey}`,
    signup: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.googleAPIKey}`
  };

  private handleError(errRes: HttpErrorResponse) {

    let defaultErrorMsg = 'An unknown error occured.';

    if (!errRes.error || !errRes.error.error) {
      return throwError(defaultErrorMsg);
    }

    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        return throwError('The email address is already in use by another account.');
      case 'OPERATION_NOT_ALLOWED':
        return throwError('Password sign -in is disabled for this project.');
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return throwError('We have blocked all requests from this device due to unusual activity. Try again later.')
      default: return throwError(defaultErrorMsg);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
  }

  signin({ email = '', password = '' } = {}) {
    const payload = { email, password, returnSecureToken: true };

    return this.http.post<AuthResponseData>(this.endpoints.signin, payload)
      .pipe(catchError(this.handleError), tap((resData) => {
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        this.user.next(user);
      }));
  }

  signup({ email = '', password = '' } = {}) {

    const payload = { email, password, returnSecureToken: true };

    return this.http.post<AuthResponseData>(this.endpoints.signup, payload).pipe(catchError(this.handleError));
  }

}
