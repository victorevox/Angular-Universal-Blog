import {NgModule, ApplicationRef} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import { TransferState } from '@angular/platform-browser';

// import { FormsModule } from "@angular/forms";
// import { HttpModule } from "@angular/http";

// export function onBootstrap(appRef: ApplicationRef, transferState: TransferState) {
//   return () => {
//     appRef.isStable
//       .filter(stable => stable)
//       .first()
//       .subscribe(() => {
//         transferState.inject();
//       });
//   };
// }

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    // HttpModule,
    // FormsModule,
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppServerModule {}
