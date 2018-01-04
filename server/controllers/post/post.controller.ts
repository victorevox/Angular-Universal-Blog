import { Request, Response, NextFunction } from "express";
import { User, IUserModel } from "./../../models";
import { Error as MongooseError } from "mongoose";
import { BaseController } from "./../base.controller";
import * as path from "path";

export class UserController extends BaseController {

    constructor() {
        super()
    }

    public update = (req: Request, res: Response) => {
        if(!this.isAuthenticated(req)) {
            return this.handleError(new Error("You must be authenticated"), req, res);
        }
        
    }

    public create = (req: Request, res: Response) => {
        if(!this.isAuthenticated(req)) {
            return this.handleError(new Error("You must be authenticated"), req, res);
        }
        return res.status(200).json({ message: "holi" });
    }
}