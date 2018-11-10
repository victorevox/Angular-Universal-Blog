import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  <simple-notifications [options]="{timeOut: 3000, showProgressBar: true, pauseOnHover: true, clickToClose: true }"></simple-notifications>
  `,
  styles: []
})
export class AppComponent {

}
