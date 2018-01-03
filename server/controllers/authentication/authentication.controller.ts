import { Request, Response, NextFunction } from "express";
import { User, IUserModel } from "./../../models";
import { authenticate } from "passport";
// import * as passport from "passport";
import { Error as MongooseError } from "mongoose";
import { BaseController } from "./../base.controller";

export class AuthenticationController extends BaseController {

    constructor() {
        super()
    }

    public register = (req: Request, res: Response) => {
        let self = this;
        if(req.body && !req.body.password || !req.body["confirm-password"]) {
            return res.status(400).json({message: "Please provide all required fields"});
        }
        if(req.body.password !== req.body["confirm-password"]) {        
            return res.status(400).json({message: "Entered passwords don't match"});
        }
        let user = new User();
        user.email = req.body.email;
        user.username = req.body.username;
        user.savePassword(req.body.password);
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
        User.find().then(users => {
            res.status(200).json(users);
        }, err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}