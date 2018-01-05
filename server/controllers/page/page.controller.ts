import { Request, Response, NextFunction } from "express";
import { Page, IPageModel } from "./../../models";
import { Error as MongooseError } from "mongoose";
import { BaseController } from "./../base.controller";
import * as path from "path";
import { USER_ROLE, IPage } from "../../../src/app/interfaces";
import { IResourceListResponse } from "../../../src/app/interfaces/misc.interface";

export class PageController extends BaseController {

    constructor() {
        super()

        //Create pages if not on DB
        Page.findOne({name: "Contact"}).then(page => {
            if(!page) {
                page = new Page();
                page.name = "Contact";
                page.title = "Contact Page";
                page.content = "Example content";
                page.save();
            }
        })
        Page.findOne({name: "Home"}).then(page => {
            if(!page) {
                page = new Page();
                page.name = "Home";
                page.title = "Home Page";
                page.content = "Example content";
                page.save();
            }
        })
    }

    public list = (req: Request, res: Response) => {
        super._list(req, res, Page)
    }

    public update = (req: Request, res: Response) => {
        if (!this.isAuthenticated(req, USER_ROLE.ADMIN)) {
            return this.handleError(new Error("You are unauthorized"), req, res);
        }
        let id = req.params.id;
        let data: IPage = req.body;
        if(!id) return this.handleError(new Error("You must provide resource ID"), req, res);
        Page.findById(id).then(post => {
            if(!post) return this.handleError(new Error("Resource not found"), req, res);
            if(data.content) {
                post.content = data.content;
            }
            if(data.title) {
                post.title = data.title
            }
            post.save().then(post => {
                return res.status(200).json({ message: "Successfully updated", post: post })
            }).catch(err => {
                this.handleError(err,req,res);
            })
        })

    }

    public create = (req: Request, res: Response) => {
        if (!this.isAuthenticated(req, USER_ROLE.ADMIN)) {
            return this.handleError(new Error("You are unauthorized"), req, res);
        }
        let data: IPage = req.body;
        if (!data) return this.handleError(new Error("You must provide all required fields"), req, res);
        let post = new Page();
        post.title = data.title;
        post.content = data.content;
        post.save().then(post => {
            return res.status(200).json({ message: "Page inserted successfully", post: post })
        }).catch(err => {
            return this.handleError(err, req, res);
        })
    }
}