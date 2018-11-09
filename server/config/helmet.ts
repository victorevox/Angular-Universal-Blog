import { Application } from 'express';
import {
    contentSecurityPolicy,
    expectCt,
    dnsPrefetchControl,
    frameguard,
    hidePoweredBy,
    hpkp,
    hsts,
    ieNoOpen,
    noCache,
    noSniff,
    referrerPolicy,
    xssFilter
} from "helmet"

export class HelmetConfig {
    public static config = (app: Application) => {
        // Sets "X-DNS-Prefetch-Control: off".
        app.use(dnsPrefetchControl());

        // Sets "X-Frame-Options: SAMEORIGIN". (by default)
        app.use(frameguard());

        //Hide "X-Powered-By ""
        app.use(hidePoweredBy());

        // Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains".
        let sixtyDaysInSeconds = 5184000
        app.use(hsts({ maxAge: sixtyDaysInSeconds }));

        // Sets "X-Download-Options: noopen".
        app.use(ieNoOpen());

        // Sets "X-Content-Type-Options: nosniff".
        app.use(noSniff());

        // Sets "Referrer-Policy: same-origin".
        app.use(referrerPolicy({ policy: 'same-origin' }));

        // Sets "X-XSS-Protection: 1; mode=block".
        app.use(xssFilter());

        //No client-side cache
        app.use(noCache());
    }
}