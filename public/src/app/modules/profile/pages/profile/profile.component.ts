import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '@appsrc/app/modules/_shared/services';

@Component({
  selector: 'profile',
  templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
  public message: string;
  public get user () {
    return this._authService.getUser();
  }

  constructor(private _authService: AuthenticationService) {}

  ngOnInit() {
    this.message = 'Hello';
  }
}