import { AuthenticationService } from "./authentication.service";
import { StorageService } from "./storage.service";
import { GlobalsService } from "./globals.service";
import { HttpClient } from "@angular/common/http";
import { AlertsService } from "./alerts.service";

export {
    AuthenticationService,
    StorageService,
    GlobalsService,
    HttpClient,
    AlertsService
}

export const BASE_SERVICES = [
    AuthenticationService,
    StorageService,
    GlobalsService,
    AlertsService
]