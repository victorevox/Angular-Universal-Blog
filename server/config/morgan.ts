import * as morgan from "morgan";
import { Application } from "express";

export class MorganConfig {
    public static config(app: Application) {
        app.use(morgan("dev"))
    }
}