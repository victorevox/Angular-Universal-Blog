import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { HttpModule, XHRBackend, RequestOptions } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { JasperoAlertsModule, AlertsService } from "@jaspero/ng-alerts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { BASE_COMPONENTS } from "./components";
import { BASE_PAGES } from "./pages";
import { ROUTES } from "./app.routing";
import { BASE_SERVICES } from "./services";
import { GUARDS } from "./guards";

import { CustomHttpService } from "./services";

@NgModule({
  declarations: [
    AppComponent,
    ...BASE_PAGES,
    ...BASE_COMPONENTS
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    JasperoAlertsModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ...BASE_SERVICES,
    ...GUARDS,
    {
      provide: CustomHttpService,
      useFactory: customHttp,
      deps: [XHRBackend, RequestOptions, Injector /* AuthService */],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function customHttp(backend: XHRBackend, options: RequestOptions, injector: Injector/* authService: AuthService */) {
  return new CustomHttpService(backend, options, injector/* authService */);
}