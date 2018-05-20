import { AuthenticationService } from "./authentication.service";
import { StorageService } from "./storage.service";
import { GlobalsService } from "./globals.service";
import { CustomHttpService } from "./custom-http.service";
import { AlertsService } from "./alerts.service";

export {
    AuthenticationService,
    StorageService,
    GlobalsService,
    CustomHttpService,
    AlertsService
}

export const BASE_SERVICES = [
    AuthenticationService,
    StorageService,
    GlobalsService,
    AlertsService
]