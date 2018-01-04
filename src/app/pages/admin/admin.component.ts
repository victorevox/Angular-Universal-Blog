import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'admin',
  templateUrl: "./admin.component.html",
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public message: string;
  public get user() {
    return this._authService.getUser();
  }

  constructor(private _authService: AuthenticationService, private _router: Router) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(this._router.routerState.snapshot.url);
        
        let res = /admin$/.test(this._router.routerState.snapshot.url);
        if(res) {
          this._router.navigate(["admin/dashboard"]);
        }
      }
    })
  }

  ngOnInit() {
    this.message = 'Hello';
  }
}