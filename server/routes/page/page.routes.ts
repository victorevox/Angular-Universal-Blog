import { Router } from "express";
import { PageController } from "@server/controllers";

export const page_router = Router();

page_router.get('/page', PageController.list);
page_router.get('/page/:id', PageController.list);
page_router.put('/page/:id', PageController.update);