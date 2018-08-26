import { StorageService } from "./storage.service";
import { GlobalsService } from "@appsrc/app/modules/_shared/services/globals.service";
import { HttpClient } from "@angular/common/http";
import { AlertsService } from "./alerts.service";

export {
    StorageService,
    GlobalsService,
    HttpClient,
    AlertsService
}

export const BASE_SERVICES = [
    StorageService,
    GlobalsService,
    AlertsService
]