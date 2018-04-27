import { Router } from "express";
import { AuthenticationController } from "@server/controllers";

export const auth_router = Router();

auth_router.post('/authentication/register', AuthenticationController.register);
auth_router.post('/authentication/login', AuthenticationController.login);
auth_router.get('/authentication/users', AuthenticationController.list);

auth_router.get('/authentication/facebook', AuthenticationController.facebook);
auth_router.get('/authentication/facebook/callback', AuthenticationController.facebookCallback);
