import { Request, Response, NextFunction } from "express";
import { Page, IPageModel } from "@server/models";
import { Error as MongooseError } from "mongoose";
import { BaseController } from "@server/controllers/base.controller";
import * as path from "path";
import { USER_ROLE, IPage, IResourceListResponse } from "@shared/interfaces";
import { getDocsByQuery } from "@server/utils/helpers/query.helper";
import { IResourceUpdateResponse } from "@shared/interfaces/misc.interface";

//Create pages if not on DB
Page.findOne({ name: "Contact" }).then(page => {
    if (!page) {
        page = new Page();
        page.name = "Contact";
        page.title = "Contact Page";
        page.content = "Example content";
        page.save();
    }
})
Page.findOne({ name: "Home" }).then(page => {
    if (!page) {
        page = new Page();
        page.name = "Home";
        page.title = "Home Page";
        page.content = "Example content";
        page.save();
    }
})

export class PageController {

    public static list = (req: Request, res: Response, next: NextFunction) => {
        getDocsByQuery(Page, req, {}).then(docs => {
            res.json(<IResourceListResponse>{ documents: docs });
        }, err => {
            console.log(err);
            // { message: ERROR_MESSAGES.ON_RESOURCE_QUERY }
            return next(err);
        })
    }

    public static update = (req: Request, res: Response, next: NextFunction) => {
        // if (!this.isAuthenticated(req, USER_ROLE.ADMIN)) {
        //     return next(new Error("You are unauthorized"));
        // }
        let id = req.params.id;
        let data: IPage = req.body;
        if (!id) return next(new Error("You must provide resource ID"));
        Page.findById(id).then(post => {
            if (!post) return next(new Error("Resource not found"));
            if (data.content) {
                post.content = data.content;
            }
            if (data.title) {
                post.title = data.title
            }
            post.save().then(post => {
                return res.status(200).json(<IResourceUpdateResponse>{ message: "Successfully updated", doc: post })
            }).catch(err => {
                return next(err);
            })
        })

    }

    public static create = (req: Request, res: Response, next: NextFunction) => {
        // if (!this.isAuthenticated(req, USER_ROLE.ADMIN)) {
        //     return next(new Error("You are unauthorized"));
        // }
        let data: IPage = req.body;
        if (!data) return next(new Error("You must provide all required fields"));
        let post = new Page();
        post.title = data.title;
        post.content = data.content;
        post.save().then(post => {
            return res.status(200).json({ message: "Page inserted successfully", post: post })
        }).catch(err => {
            return next(err);
        })
    }
}