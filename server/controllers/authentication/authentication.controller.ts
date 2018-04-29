import { Request, Response, NextFunction } from "express";
import { User, IUserModel } from "@server/models";
import { authenticate } from "passport";
// import * as passport from "passport";
import { Error as MongooseError } from "mongoose";
import { BaseController } from "@server/controllers/base.controller";
import { USER_ROLE, AUTH_TYPES, AUTH_SOCIAL_STATUS, IResourceListResponse } from "@shared/interfaces";
import { getDocsByQuery } from "@server/utils/helpers/query.helper";
import { IResourceCreateResponse } from "@shared/interfaces/misc.interface";

export class AuthenticationController {

    public static register = (req: Request, res: Response, next: NextFunction) => {
        if (req.body && !req.body.password || !req.body["confirm-password"]) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        if (req.body.password !== req.body["confirm-password"]) {
            return res.status(400).json({ message: "Entered passwords don't match" });
        }
        let user = new User();
        user.email = req.body.email;
        user.username = req.body.username;
        user.savePassword(req.body.password);
        user.roles = [USER_ROLE.USER];
        user.save((err: { code: number, errmsg: string }, user) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (!user) {
                return res.status(500).json({ message: "User not found" })
            }
            return res.status(200).json(<IResourceCreateResponse>{ message: "User saved", doc: user });
        });
    }

    public static login = (req: Request, res: Response, next: NextFunction) => {
        authenticate('local', function (err, user: IUserModel, info) {
            if (err) {
                console.log(err);
                // return next(err);
                return res.status(500).json(err);
            }
            if (!user) {
                return res.status(401).json({ message: "Wrong credentials" });
            }
            // req.logIn
            let token = user.generateJwt();
            return res.status(200).json({ message: "Success", token: token });
        })(req, res, next);
    }

    public static list = (req: Request, res: Response, next: NextFunction) => {
        getDocsByQuery(User, req, { }).then(docs => {
            res.json(<IResourceListResponse>{ documents: docs });
        }, err => {
            console.log(err);
            // { message: ERROR_MESSAGES.ON_RESOURCE_QUERY }
            return next(err);
        })
    }

    public static facebook = authenticate('facebook', {
        scope: ['email'],
        // display: 'popup'
    });


    public static facebookCallback = (req: Request, res: Response) => {
        authenticate('facebook', function (err, user, info) {
            if (err) {
                console.log(err);
                return res.redirect('/');
            }
            console.log(user);
            
            if (info.message === "Permissions error") return res.redirect('/external-login/' + "000");
            if (!user) return res.redirect(`/authenticate/?status=${AUTH_SOCIAL_STATUS.FAIL}&message=${info.message}`);
            var token = user.generateJwt();
            return res.redirect(`/authenticate/?token=${token}&status=${AUTH_SOCIAL_STATUS.SUCCESS}&message=${info.message}&auth_type=${AUTH_TYPES.FACEBOOK}`);
            // res.status(200).send({ token: token });
        })(req, res);
    }

    // public google = (req: Request, res: Response) => {
    //     authenticate('google');
    // }
}