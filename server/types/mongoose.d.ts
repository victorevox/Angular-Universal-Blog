
import * as mongoose from "mongoose";
import { Request } from "express";
import {  } from "module";
// import { Schema as DefaultSchema, SchemaOptions as DefaultSchemaOptions } from "mongoose";
import { IUserModel } from "@server/models";
// import { mongooseSchema as MongooseSchema } from "mongoose";
declare module "mongoose" {

    export interface Schema {
        // expose internal options property
        options: mongoose.SchemaOptions;
        model: mongoose.Model<any>;
    }

    export interface SchemaType {
        caster: any;
        instance: string;
        options: any;
    }

    export interface Query<T> {
        mongooseOptions(): any;
        schema: any;
    }

    export interface Model<T> {
        esSearch(query: any): Query<T>;
    }

    export class ExtendableMongooseSchema extends mongoose.Schema {
        extend(schema: mongoose.SchemaDefinition, options?: SchemaOptions): mongoose.Schema;
    }

    export interface SchemaOptions {
        /**
         * Indicates if this schema should be treated as a tenant schema
         * (should create it's collection on tenant's DB)
         */
        tenant?: boolean;
        name?: string;

        /** declare the request variable where @code Express.Request will be stored */
        locals?: {
            request?: Request;
            user?: IUserModel;
            connections?: {
                [connectionName: string]: mongoose.Connection
            };
            [property: string]: any;
        }
    }

    // export interface Model<T> {
    //     esSynchronize(): Promise<any>
    // }

}