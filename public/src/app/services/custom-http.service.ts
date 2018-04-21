import { Injectable, Injector } from '@angular/core';
import { Http, ConnectionBackend, Headers, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class CustomHttpService extends Http {

    private _authService: AuthenticationService;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, injector: Injector) {
        super(backend, defaultOptions);
        setTimeout(() => this._authService = injector.get(AuthenticationService));
    }

    post(url: string, body: any, requestOptions?: RequestOptionsArgs) {
        return super.post(url, body, this.setHeaders(requestOptions));
    }

    put(url: string, body: any, requestOptions?: RequestOptionsArgs) {
        return super.put(url, body, this.setHeaders(requestOptions));
    }

    setHeaders(options: RequestOptionsArgs) {
        if (!options) {
            // let's make option object
            options = { headers: new Headers() };
        }
        options.headers.append('Authorization', `${this._authService.getToken()}`)
        return options;
    }
}