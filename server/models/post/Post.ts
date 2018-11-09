// var mongoose = require('mongoose');
import { Document, Schema, Model, model, Types } from "mongoose";
import { randomBytes, pbkdf2Sync } from "crypto";
import * as jwt from "jsonwebtoken";
import { IPost } from "@shared/interfaces";
import { MODEL_NAME_DEFINITIONS } from "@server/utils/constants";

export var PostSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    }
})

PostSchema.pre("save", function (next) {
    let now = new Date();
    let post = <IPostModel>this;
    if (!post.createdAt) {
        post.createdAt = now;
    }
    next();
});

export var Post: Model<IPostModel> = model<IPostModel>(MODEL_NAME_DEFINITIONS.POST, PostSchema);

export interface IPostModel extends IPost, Document {
    
}