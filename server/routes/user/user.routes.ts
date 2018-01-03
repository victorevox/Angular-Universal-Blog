import { Router } from "express";
import { UserController } from "../../controllers";

export const user_router = Router();

let Controller = new UserController();

user_router.put('/user', Controller.update);