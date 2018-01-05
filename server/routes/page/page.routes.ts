import { Router } from "express";
import { PageController } from "../../controllers";

export const page_router = Router();

let Controller = new PageController();

page_router.get('/page', Controller.list);
page_router.get('/page/:id', Controller.list);
page_router.put('/page/:id', Controller.update);