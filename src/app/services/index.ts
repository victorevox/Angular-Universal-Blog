import { AuthenticationService } from "./authentication.service";
import { StorageService } from "./storage.service";
import { GlobalsService } from "./globals.service";

export {
    AuthenticationService,
    StorageService,
    GlobalsService
}

export const BASE_SERVICES = [
    AuthenticationService,
    StorageService,
    GlobalsService
]