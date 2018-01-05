import { AuthenticationService } from "./authentication.service";
import { StorageService } from "./storage.service";
import { GlobalsService } from "./globals.service";
import { CustomHttpService } from "./custom-http.service";

export {
    AuthenticationService,
    StorageService,
    GlobalsService,
    CustomHttpService
}

export const BASE_SERVICES = [
    AuthenticationService,
    StorageService,
    GlobalsService
]