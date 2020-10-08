import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('authForm') authForm: NgForm;

  isLoginMode = false;
  isLoading = false;
  error = null;
  registerationSuccess = null;
  reactiveForm: FormGroup;
  formSubscription: Subscription;
  authObs: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.formSubscription = this.authForm.valueChanges.subscribe(() => {
      this.error = null;
      this.registerationSuccess = null;
    })
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  onSwitchAuthMode() {
    this.authForm.reset();
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitAuthForm(authForm: NgForm) {
    const { email, password, confirmPassword } = authForm.value;
    if (
      email.trim().length === 0
      || password.trim().length === 0
    ) {
      this.error = 'Empty value(s) not allowed.';
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authObs = this.authService.signin({ email, password });
    } else {
      this.error = (
        password.trim() === confirmPassword.trim()
          ? null : 'Passwords don\'t match.'
      );
      if (this.error) return;
      this.registerationSuccess = 'Registeration in progress...';
      this.authObs = this.authService.signup({ email, password });
    }

    this.authObs.subscribe((resData) => {
      this.isLoading = false;
      this.authForm.reset();
      if (!this.isLoginMode) {
        this.registerationSuccess = 'Registeration Successful.';
      }
      if (this.isLoginMode) {
        this.router.navigate(['/']);
      }
      console.log((this.isLoginMode ? 'Logged In' : 'Registered'));
      console.log(resData);
    }, (errorMsg) => {
      if (!this.isLoginMode) {
        this.registerationSuccess = 'Registeration Failed.';
      }
      this.isLoading = false;
      this.error = errorMsg;
      console.error(errorMsg);
    })
  }

  clearErrors() {
    this.error = null;
    this.registerationSuccess = null;
  }

  passwordMatch(control: FormControl): { [s: string]: boolean } {
    if (control.value.trim().length === 0) {
      return { passwordMatch: true };
    }
    return null;
  }

}
