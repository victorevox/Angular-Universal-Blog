import { Request, Response, NextFunction } from "express";
import { Post, IPostModel } from "@server/models";
import { Error as MongooseError } from "mongoose";
import { BaseController } from "@server/controllers/base.controller";
import * as path from "path";
import { IResourceListResponse, USER_ROLE, IPost } from "@shared/interfaces";

export class PostController extends BaseController {

    constructor() {
        super()
    }

    public list = (req: Request, res: Response) => {
        this._list(req, res, Post);
    }

    public update = (req: Request, res: Response) => {
        if (!this.isAuthenticated(req, USER_ROLE.ADMIN)) {
            return this.handleError(new Error("You are unauthorized"), req, res);
        }
        let id = req.params.id;
        let data: IPost = req.body;
        if(!id) return this.handleError(new Error("You must provide resource ID"), req, res);
        Post.findById(id).then(post => {
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
        let data: IPost = req.body;
        if (!data) return this.handleError(new Error("You must provide all required fields"), req, res);
        let post = new Post();
        post.title = data.title;
        post.content = data.content;
        post.save().then(post => {
            return res.status(200).json({ message: "Post inserted successfully", post: post })
        }).catch(err => {
            return this.handleError(err, req, res);
        })
    }
}