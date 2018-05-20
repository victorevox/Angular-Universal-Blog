import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "@app/services";
import { USER_ROLE } from "@shared/interfaces";
import { AlertsService } from '@app/services/alerts.service';

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