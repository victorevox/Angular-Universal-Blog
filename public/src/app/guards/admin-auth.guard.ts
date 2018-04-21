import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "./../services";
import { USER_ROLE } from "./../interfaces";
import { AlertsService } from "@jaspero/ng-alerts";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private _authService: AuthenticationService, private _router: Router, private _alerts: AlertsService) {
    
  }

  canActivate() {
    console.log("AlwaysAuthGuard");
    let user = this._authService.getUser();
    if(!user) {
      this._alerts.create("error", "Not Authorized");
      this._router.navigate(["/"]);
      return false;
    }
    if(user.roles.indexOf(USER_ROLE.ADMIN) !== -1) {
      return true;
    }
  }
}