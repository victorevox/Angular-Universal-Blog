import { Application } from "express";
import { auth_router } from "./authentication/authentication.routes";
import { user_router } from "./user/user.routes";

export const api_routes = (app: Application) => {
    app.use('/api', auth_router);
    app.use('/api', user_router);
}