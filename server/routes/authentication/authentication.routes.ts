import { Router } from "express";
import { AuthenticationController } from "../../controllers";

export const auth_router = Router();

let Controller = new AuthenticationController();

auth_router.post('/authentication/register', Controller.register);
auth_router.post('/authentication/login', Controller.login);
auth_router.get('/authentication/users', Controller.list);