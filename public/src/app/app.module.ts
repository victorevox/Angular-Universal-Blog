import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { BASE_COMPONENTS } from "./components";
import { BASE_PAGES } from "./pages";
import { ROUTES } from "./app.routing";
import { BASE_SERVICES } from "./services";
import { GUARDS } from "./guards";

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
    SimpleNotificationsModule.forRoot(),
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    // HttpInterceptors,
    ...BASE_SERVICES,
    ...GUARDS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }