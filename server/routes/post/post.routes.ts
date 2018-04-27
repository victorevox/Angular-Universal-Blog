import { Router } from "express";
import { PostController } from "@server/controllers";

export const post_router = Router();

post_router.get('/post', PostController.list);
post_router.get('/post/:id', PostController.list);
post_router.put('/post/:id', PostController.update);
post_router.post('/post', PostController.create);