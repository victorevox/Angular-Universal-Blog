import { NgModule, Injectable, ModuleWithProviders } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { Subject } from "rxjs/Subject";

@Injectable()
export class AlertsService {
    alert$: Subject<any>;
    create(type?: any, message?: any, title?: any, override?: any) { };
}

@NgModule({
    providers: [
        AlertsService
    ],
    // exports: [
    //     AlertsService
    // ]
})
export class JasperoAlertsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: JasperoAlertsModule,
            providers: [AlertsService]
        };
    }
}
