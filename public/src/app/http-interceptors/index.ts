import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthenticateInterceptor } from "./authenticate.interceptor";

export const HttpInterceptors = [
    { token: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true }
]