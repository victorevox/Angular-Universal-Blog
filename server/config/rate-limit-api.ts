import { Application } from 'express';
import * as RateLimit from 'express-rate-limit';

//Brute force api limiter
export class RateLimitAPIConfig {
    public static config = (app: Application) => {
        // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
        if (process.env.REQ_LIMIT_PROXY === 'true') app.enable('trust proxy');

        const apiLimiter = new RateLimit({
            windowMs: 60 * 1000, // 1 minute
            max: 100, // limit each IP to 100 requests per windowMs
            delayMs: 0 // disabled
        });

        // only apply to requests that begin with /api/v1
        app.use(process.env.API_PREFIX, apiLimiter);
    }
}