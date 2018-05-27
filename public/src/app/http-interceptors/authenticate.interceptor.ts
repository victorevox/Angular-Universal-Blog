import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { AuthenticationService } from "@app/services/authentication.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authService.isAunthenticated()) {
            req.headers.set("Authentication", `Bearer ${this.authService.getToken()}`);
        }
        return next.handle(req);
    }
}