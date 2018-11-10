import { Injectable } from '@angular/core';

@Injectable()
export class AlertsService {

    constructor() {

    }

    create(type?, message?, title?, override?): void {
        return alert(message);
    }

}