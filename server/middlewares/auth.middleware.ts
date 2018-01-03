import { Application, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2Sync } from "crypto";
import { IUser } from "./../../src/app/interfaces";
import { User, IUserModel } from "./../models";
import { decode } from "jsonwebtoken";

// declare global {
//     namespace Express {
//         interface Request {
//             // authInfo?: any;
//             user?: IUserModel;
//         }
//     }
// }

export class AuthMiddleware {
    constructor() {

    }

    public static init = (req: Request, res: Response, next: NextFunction) => {
        let user: IUser = null;
        try {
            let token = <string>req.headers["authorization"];
            if(!token) return next();
            if((<any>User).validateToken(token)) {
                // let string = atob(token.split('.')[1]);
                user = <any>decode(token, {complete: false, json: true});
                console.log(user);
                // user = <IUser>JSON.parse(string);
                User.findOne({ email: user.email }).then((user) => {
                    if (!user.username && user.email) {
                        user.username = user.email;
                    }
                    req.user = user;
                    next();
                }).catch(err => {
                    return AuthMiddleware.reject(err, req, res)
                })
            } else {
                return AuthMiddleware.reject(new Error("Invalid token"), req, res);
            }
        } catch (err) {
            console.error(err);
            return AuthMiddleware.reject(err, req, res);
        }
    }

    public static reject(err: Error, req: Request, res: Response) {
        let message = err.message;
        console.log(message);
        message = "Error while authenticating"
        return res.status(401).json({ message: message });
    }
}