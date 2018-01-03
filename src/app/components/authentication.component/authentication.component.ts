import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "./../../services";
import { NgForm } from "@angular/forms";
import { AlertsService } from '@jaspero/ng-alerts';

enum AUTH_TYPES {
  SIGNUP = "signup",
  LOGIN = "login"
}

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class AuthenticationComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  // private AUTH_TYPES 
  public auth_type = AUTH_TYPES.LOGIN;
  public title: string = "";

  constructor(private _router: Router, private route: ActivatedRoute, private _authService: AuthenticationService, private _alerts: AlertsService, private _cDr: ChangeDetectorRef) {
    this._router.routerState.root.queryParams.subscribe((params) => {
      let type = params["auth_type"];
      this.route;
      this._router;
      if (type) {
        console.log(type);
        switch (type) {
          case AUTH_TYPES.LOGIN:
            this.setupLogin();
            break;
          case AUTH_TYPES.SIGNUP:
            this.setupSignup();
            break;
          default:
            this.goLogin();
            break;
        }
      }
      console.log(params)
    });
  }

  ngOnInit() {
  }

  submit(event: Event) {
    event.preventDefault();
    console.log(this.form);
    if(this.form.valid) {
      let promise: Promise<void>;
      
      switch (this.auth_type) {
        case AUTH_TYPES.LOGIN:
          promise = this._authService.loginByCredentials(this.form.value);
        break;
        case AUTH_TYPES.SIGNUP:
          promise = this._authService.signupByCredentials(this.form.value);
        break;
        
        default:
        break;
      }
      if(promise && promise.then) {
        promise.then(() => {
          switch (this.auth_type) {
            case AUTH_TYPES.LOGIN:
            this._router.navigate(["profile"])
            break;
            case AUTH_TYPES.SIGNUP:
            break;
            
            default:
            break;
          }
          this._cDr.markForCheck();
        })
      }
    } else {
      this._alerts.create("error", "Please check that all fiedls are valid", "Invalid Form");
    }
    return console.log("Form invalid");
  }

  setupLogin() {
    this.auth_type = AUTH_TYPES.LOGIN;
    this.title = "Please Login";
  }
  
  setupSignup() {
    this.auth_type = AUTH_TYPES.SIGNUP;
    this.title = "Please Signup"
  }

  isLogin() {
    return this.auth_type === AUTH_TYPES.LOGIN;
  }

  goSignup() {
    console.log("To Signup");
    this._router.navigate(['authenticate'], { queryParams: { auth_type: "signup" } });
  }
  
  goLogin() {
    console.log("To Login");
    this._router.navigate(['authenticate'], { queryParams: { auth_type: "login" } });
  }

  isAuthenticated() {
    return this._authService.isAunthenticated();
  }

  changeType() {
    if(this.isLogin()) {
      return this.goSignup();
    } else {
      return this.goLogin();
    }
  }

}