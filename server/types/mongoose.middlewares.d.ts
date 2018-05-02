import * as mongoose from "mongoose";
import { ISecurityPolicy } from "@server/middlewares/mongoose/security.mongoose-middleware";

declare module "mongoose" {

    export interface SchemaOptions {
        security?: ISecurityPolicy,
        log?:Boolean
    }


    export interface Model<T> {
        $$read();
    }
}