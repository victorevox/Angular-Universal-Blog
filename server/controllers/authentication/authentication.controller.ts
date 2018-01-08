import { Request, Response, NextFunction } from "express";
import { User, IUserModel } from "./../../models";
import { authenticate } from "passport";
// import * as passport from "passport";
import { Error as MongooseError } from "mongoose";
import { BaseController } from "./../base.controller";
import { USER_ROLE, AUTH_TYPES, AUTH_SOCIAL_STATUS } from "./../../../src/app/interfaces";

export class AuthenticationController extends BaseController {

    constructor() {
        super()
    }

    public register = (req: Request, res: Response) => {
        let self = this;
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
                return self.handleError(err, req, res);
            }
            if (!user) {
                return res.status(500).json({ message: "User not found" })
            }
            return res.status(200).json({ message: "User saved", user: user });
        });
    }

    public login = (req: Request, res: Response, next: NextFunction) => {
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

    public list = (req: Request, res: Response) => {
        super._list(req, res, User);
        // User.find().then(users => {
        //     res.status(200).json(users);
        // }, err => {
        //     console.log(err);
        //     res.status(500).json(err    );
        // })
    }

    public facebook = authenticate('facebook', {
        scope: ['email'],
        // display: 'popup'
    });


    public facebookCallback = (req: Request, res: Response) => {
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