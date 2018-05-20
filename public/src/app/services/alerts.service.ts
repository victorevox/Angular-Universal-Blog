import { Injectable } from '@angular/core';
// import { AlertsService as JasperoAlertsService } from '@jaspero/ng-alerts';
import { Location } from "@angular/common";

@Injectable()
export class AlertsService {

    constructor(/* private _alert: JasperoAlertsService */) {

    }

    create(type?, message?, title?, override?): void {
        return null;
        // return this._alert.create(type, message, title, override)
    }

}