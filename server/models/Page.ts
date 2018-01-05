// var mongoose = require('mongoose');
import { Document, Schema, Model, model, Types } from "mongoose";
import { randomBytes, pbkdf2Sync } from "crypto";
import * as jwt from "jsonwebtoken";
import { IPage } from "./../../src/app/interfaces";

export var PageSchema: Schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
    },
    createdAt: {
        type: Date
    }
})

PageSchema.pre("save", function (next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    this.updatedAt = new Date();
    next();
});

export var Page: Model<IPageModel> = model<IPageModel>("Page", PageSchema);

export interface IPageModel extends IPage, Document {
    
}