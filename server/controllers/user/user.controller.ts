import { Request, Response, NextFunction } from "express";
import { User, IUserModel } from "./../../models";
import { Error as MongooseError } from "mongoose";
import { BaseController } from "./../base.controller";
import { IncomingForm } from "formidable";
import * as path from "path";

export class UserController extends BaseController {

    constructor() {
        super()
    }

    public update = (req: Request, res: Response) => {
        if(!this.isAuthenticated(req)) {
            return this.handleError(new Error("You must be authenticated"), req, res);
        }
        let form = new IncomingForm();
        console.log(__dirname);
        let uploadDir = path.join(__dirname, '/../statics/img');
        form.multiples = true;
        form.keepExtensions = true;
        form.uploadDir = uploadDir;
        let updatePromises = [Promise.resolve()];
        form.parse(req, (err, fields, files) => {
            try {
                if(files) {
                    var path = files.file.path;
                    var routeToFileReg = /\/statics\/(.*)/.exec(path);
                    if(routeToFileReg) {
                        var routeToFile = routeToFileReg[1];
                        (<IUserModel>req.user).profileImg = routeToFile;
                        console.log(routeToFile);
                    }    
                }
                Promise.all(updatePromises).then(() => {
                    (<IUserModel>req.user).save().then((user) => {
                        return res.status(200).json({ message: "Working", token: user.generateJwt(), user: user.toJSON() });
                    }).catch(err => {
                        this.handleError(err, req, res);
                    })
                })
            } catch (error) {
                this.handleError(error, req, res);
            }
        })
    }
}