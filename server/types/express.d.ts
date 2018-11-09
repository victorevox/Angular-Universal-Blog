import * as express from "express";
import {  } from "module";
import { IUserModel } from "@server/models";
import { Model } from "mongoose";

declare module "express" {
    interface Request { 
        user: IUserModel;
        isAdmin: boolean
        model(something, options?): Model<any>;
     }
}