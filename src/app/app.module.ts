import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { JasperoAlertsModule, AlertsService } from "@jaspero/ng-alerts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { BASE_COMPONENTS } from "./components";
import { BASE_PAGES } from "./pages";
import { ROUTES } from "./app.routing";
import { BASE_SERVICES } from "./services";

@NgModule({
  declarations: [
    AppComponent,
    ...BASE_PAGES,
    ...BASE_COMPONENTS
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    JasperoAlertsModule.forRoot(),
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ...BASE_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
