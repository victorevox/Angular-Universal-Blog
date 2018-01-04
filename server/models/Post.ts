// var mongoose = require('mongoose');
import { Document, Schema, Model, model, Types } from "mongoose";
import { randomBytes, pbkdf2Sync } from "crypto";
import * as jwt from "jsonwebtoken";
import { IPost } from "./../../src/app/interfaces";

export var PostSchema: Schema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date
    }
})

PostSchema.pre("save", function (next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

export var Post: Model<IPostModel> = model<IPostModel>("Post", PostSchema);

export interface IPostModel extends IPost, Document {
    
}