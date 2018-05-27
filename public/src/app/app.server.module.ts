import { NgModule, ApplicationRef, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
// import { TransferState } from '@angular/platform-browser';
// import { TransferState } from '../modules/transfer-state/transfer-state';

import { BrowserModule } from '@angular/platform-browser';
import { filter, first } from "rxjs/operators";

import { ServerTransferStateModule } from '../modules/transfer-state/server-transfer-state.module';
import { TransferState } from '../modules/transfer-state/transfer-state';


export function onBootstrap(appRef: ApplicationRef, transferState: TransferState) {
  return () => {
    appRef.isStable
      .pipe(filter(stable => stable))
      .pipe(first())
      .subscribe(() => {
        transferState.inject();
      });
  };
}

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    BrowserModule.withServerTransition({
      appId: 'my-app'
    }),
    ServerModule,
    // ModuleMapLoaderModule,
    ServerTransferStateModule,
    // HttpModule,
    // FormsModule,
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: onBootstrap,
      multi: true,
      deps: [
        ApplicationRef,
        TransferState
      ]
    }
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppServerModule { }
