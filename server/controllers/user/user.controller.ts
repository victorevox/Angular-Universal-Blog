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
        let form = new IncomingForm();
        let uploadDir = path.join(__dirname, '/../../../dist/server/img/')
        form.multiples = true
        form.keepExtensions = true
        form.uploadDir = uploadDir
        form.parse(req, (err, fields, files) => {
            console.log(files);
            res.status(200).json({ message: "Working" });
        })
    }
}