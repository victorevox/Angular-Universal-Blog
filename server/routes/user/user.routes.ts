import { Router } from "express";
import { UserController } from "@server/controllers";

export const user_router = Router();

user_router.put('/user', UserController.update);