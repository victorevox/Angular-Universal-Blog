import { AuthenticationService } from "./authentication.service";
import { StorageService } from "./storage.service";

export {
    AuthenticationService,
    StorageService
}

export const BASE_SERVICES = [
    AuthenticationService,
    StorageService
]