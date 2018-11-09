import * as cors from 'cors';
import { Application } from 'express';

export class CorsConfig {
    public static config(app: Application) {
        app.use(cors())
    }
}