import { Application, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2Sync } from "crypto";
import { IUser } from "@shared/interfaces/user.interface";
import { User, IUserModel } from "@server/models";
import { decode, verify } from "jsonwebtoken";
import { intersection } from 'lodash'
import { USER_ROLES } from "@shared/constants/user.constants";

// declare global {
//     namespace Express {
//         interface Request {
//             // authInfo?: any;
//             user?: IUserModel;
//         }
//     }
// }

export class AuthMiddleware {

    public static init = (requiredRoles: Array<USER_ROLES.ADMIN | USER_ROLES.USER>) => {
        return (req: Request, res: Response, next: NextFunction) => {
            let user: IUser = null;
            try {
                let token = <string>req.headers["authorization"];
                if (!token) return AuthMiddleware.decline(new Error('Must be authenticated to proceed.'), req, res)
                if (verify(token, process.env.JWT_SECRET || "MY_SECRET")) {
                    // let string = atob(token.split('.')[1]);
                    let userDecoded: IUser = <any>decode(token, { complete: false, json: true });
                    // userDecoded = <IUser>JSON.parse(string);
                    User.findById(userDecoded._id)
                        .then((user) => {
                            if (!user) return AuthMiddleware.decline(new Error('Unable to find user for authentication.'), req, res);
                            let rolesIntersection = intersection(user.roles, requiredRoles);
                            if (!rolesIntersection.length) return AuthMiddleware.decline(new Error('You do no have enough privileges to perfom this action.'), req, res);
                            if (rolesIntersection.indexOf(USER_ROLES.ADMIN) !== -1) req.isAdmin = true;
                            // if (!req.isAdmin && req.params._id !== user._id.toString() && req.method === "PUT") return AuthMiddleware.decline(new Error('You are not authorized to update this resource.'), req, res);
                            req.user = user;
                            next();
                        }).catch(err => {
                            return AuthMiddleware.decline(err, req, res)
                        })
                } else return AuthMiddleware.decline(new Error("Invalid token"), req, res);
            } catch (err) {
                return AuthMiddleware.decline(err, req, res);
            }
        }
    } 
    

    public static decline(err: Error, req: Request, res: Response) {
        let message = err.message;
        console.log(message);
        message = "Error while authenticating"
        return res.status(401).json({ message: message });
    }
}