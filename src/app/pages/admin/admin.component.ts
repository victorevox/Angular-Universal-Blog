import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'admin',
  templateUrl: "./admin.component.html",
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public message: string;
  public get user () {
    return this._authService.getUser();
  }

  constructor(private _authService: AuthenticationService) {}

  ngOnInit() {
    this.message = 'Hello';
  }
}