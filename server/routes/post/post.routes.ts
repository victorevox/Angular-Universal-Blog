import { Router } from "express";
import { PostController } from "../../controllers";

export const post_router = Router();

let Controller = new PostController();

post_router.get('/post', Controller.list);
post_router.get('/post/:id', Controller.list);
post_router.put('/post/:id', Controller.update);
post_router.post('/post', Controller.create);