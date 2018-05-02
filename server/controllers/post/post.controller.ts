import { Request, Response, NextFunction } from "express";
import { Post, IPostModel } from "@server/models";
import { Error as MongooseError } from "mongoose";
import { BaseController } from "@server/controllers/base.controller";
import * as path from "path";
import { IResourceListResponse, USER_ROLE, IPost } from "@shared/interfaces";
import { getDocsByQuery } from "@server/utils/helpers/query.helper";
import { IResourceUpdateResponse, IResourceCreateResponse } from "@shared/interfaces/misc.interface";
import { MODEL_NAME_DEFINITIONS } from "@server/utils/constants/misc.constants";

export class PostController {

    public static list = (req: Request, res: Response, next: NextFunction) => {
        req.model(MODEL_NAME_DEFINITIONS.POST).$$read()(req, res, next);
        // getDocsByQuery(Post, req, { }).then(docs => {
        //     res.json(<IResourceListResponse>{ documents: docs });
        // }, err => {
        //     console.log(err);
        //     // { message: ERROR_MESSAGES.ON_RESOURCE_QUERY }
        //     return next(err);
        // })
    }

    public static update = (req: Request, res: Response, next: NextFunction) => {
        // if (!this.isAuthenticated(req, USER_ROLE.ADMIN)) {
        //     return this.handleError(new Error("You are unauthorized"), req, res);
        // }
        let id = req.params.id;
        let data: IPost = req.body;
        if(!id) return next(new Error("You must provide resource ID"));
        Post.findById(id).then(post => {
            if(!post) return next(new Error("Resource not found"));
            if(data.content) {
                post.content = data.content;
            }
            if(data.title) {
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
        //     return this.handleError(new Error("You are unauthorized"), req, res);
        // }
        let data: IPost = req.body;
        if (!data) return next(new Error("You must provide all required fields"));
        let post = new Post();
        post.title = data.title;
        post.content = data.content;
        post.save().then(post => {
            return res.status(200).json(<IResourceCreateResponse>{ message: "Post inserted successfully", doc: post })
        }).catch(err => {
            return next(err);
        })
    }
}