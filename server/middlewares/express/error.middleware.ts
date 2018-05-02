import { Application, Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { randomBytes, pbkdf2Sync } from "crypto";
import { IUser } from "@shared/interfaces/user.interface";
import { User, IUserModel } from "@server/models";
import { decode } from "jsonwebtoken";
import * as httpStatusCodes from "http-status-codes";

export class ErrorMiddleware {

    public static init(err: any, req: Request, res: Response, next: NextFunction) {
        //if no status already defined, set 500
        if(!res.status){
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
        }
        console.log(err);
        res.json({message: "error"})
    }

    public static reject(err: Error, req: Request, res: Response) {
        let message = err.message;
        console.log(message);
        message = "Error while authenticating"
        return res.status(401).json({ message: message });
    }
}