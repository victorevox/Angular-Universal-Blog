import { Application } from "express";
import { auth_router } from "./authentication/authentication.routes";
import { user_router } from "./user/user.routes";
import { post_router } from "./post/post.routes";
import { page_router } from "./page/page.routes";
import { AuthMiddleware, MongooseCustomMiddleware } from "./../middlewares/express";

export const api_routes = (app: Application) => {
    //Add auth and mongoose model compiler midlewares
    app.use('/api', AuthMiddleware.init([]), MongooseCustomMiddleware.init)
    app.use('/api', auth_router);
    app.use('/api', user_router);
    app.use('/api', post_router);
    app.use('/api', page_router);
}