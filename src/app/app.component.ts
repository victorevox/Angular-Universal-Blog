import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  <jaspero-alerts [defaultSettings]="{overlay: true, duration: 6000}"></jaspero-alerts>
  `,
  styles: []
})
export class AppComponent {

}
