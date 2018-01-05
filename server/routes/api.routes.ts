import { Application } from "express";
import { auth_router } from "./authentication/authentication.routes";
import { user_router } from "./user/user.routes";
import { post_router } from "./post/post.routes";
import { page_router } from "./page/page.routes";
import { AuthMiddleware } from "./../middlewares";

export const api_routes = (app: Application) => {
    //Add auth midleware
    app.use('/api', AuthMiddleware.init)
    app.use('/api', auth_router);
    app.use('/api', user_router);
    app.use('/api', post_router);
    app.use('/api', page_router);
}