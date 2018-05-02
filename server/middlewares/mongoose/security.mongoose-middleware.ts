const _ = require("lodash");
import { SchemaOptions, Schema, MongooseDocument, Query } from "mongoose";
import { IUserModel } from "@server/models";

export class SecurityMiddleware {

    public static init(schema: Schema, options) {
        let schemaOptions: SchemaOptions;
        schemaOptions = schema.options;
        if (schemaOptions.security) {
            let security_policies = schemaOptions.security;
            let request = schemaOptions.locals && schemaOptions.locals.request;
            let user = request && request.user;
            if (security_policies.create || security_policies.update) {
                schema.pre("save", function test(next) {
                    let doc = this;
                    console.log(request.method);
                    let policy;
                    let action;
                    let promises = [Promise.resolve()];
                    action = request.method === "POST" ? "create" : "update";
                    if (!security_policies[action]) return next();
                    if (_.isFunction(security_policies[action])) {
                        policy = security_policies[action](user, doc, request);
                        promises.push(Promise.resolve(policy));
                        if (policy instanceof Promise) {
                            promises.push(policy)
                        };
                    }
                    Promise.all(promises).then((results) => {
                        policy = results[results.length - 1];
                        switch (action) {
                            case "create":
                                if (!security_policies.create) return next()
                                if (security_policies.create && policy) return next();
                                else throw new SecurityMongooseError(`Can't  ${security_policies.create ? "create" : "update"}, policy restricted`, ERROR_CODES.UNAUTHORIZED);
                            case "update":
                                if (!security_policies.update) return next();
                                else if (security_policies.update && policy) return next();
                                else throw new SecurityMongooseError(`Can't  ${security_policies.create ? "create" : "update"}, policy restricted`, ERROR_CODES.UNAUTHORIZED);
                        }
                    }, next)
                });
                schema.pre("update", function (next) {
                    /** @type {Query} */
                    console.log(this);
                    let query = this;
                    let policy;
                    let promises = [Promise.resolve()];
                    if (_.isFunction(security_policies.update)) {
                        policy = security_policies.update(user, null, request, query);
                        promises.push(Promise.resolve(policy));
                        if (policy instanceof Promise) {
                            promises.push(policy)
                        };
                    } else {
                        throw new SecurityMongooseError("Invalid policy definition", ERROR_CODES.INVALID_POLICY);
                    }

                    Promise.all(promises).then(results => {
                        policy = results[results.length - 1];
                        if (policy) return next();
                        throw "Can't update, policy restricted";
                    }, next)

                });
                // add hook for update for monggose 
            }
            if (security_policies.read) {
                schema.pre("find", function (next) {
                    /** @type {Query} */
                    let query = this;
                    /** @type {MongooseMiddlewares.SecurityMiddleware.IReadObjectPolicy | MongooseMiddlewares.SecurityMiddleware.IReadFunctionPolicy} */
                    let policy;
                    let promises = [Promise.resolve()];
                    if (typeof security_policies.read === "function") {
                        policy = security_policies.read(user, request);
                        promises.push(Promise.resolve(policy));
                        if (policy instanceof Promise) {
                            promises.push(policy)
                        };
                    } else if (_.isObject(security_policies.read)) {
                        policy = security_policies.read;
                        promises.push(Promise.resolve(policy));
                    }
                    Promise.all(promises).then(results => {
                        policy = results[results.length - 1];
                        policy = compilePolicyOptions(policy, {
                            $$user: user,
                            $$request: request
                        })
                        console.log("Applying policy on read");
                        if (_.isBoolean(policy)) {
                            // if policy is boolean and false, limit to 0
                            policy && query.limit(0);
                        } else if (_.isObject(policy)) {
                            // if filters defined on policy, then apply to the query
                            if (policy.filters) {
                                // for (const key in policy.filters) {
                                //   query = query.where(key, policy.filters[key]);
                                // }
                                query.where(policy.filters)
                            }
                            if (policy.fields) {
                                query.select(policy.fields);
                            }
                        } else throw new SecurityMongooseError(`Wrong read policy object for schema Model ${schema.model && schema.model.modelName}`, ERROR_CODES.INVALID_POLICY);
                        next();
                    }, next)
                })
            }
            if (security_policies.delete) {
                console.log("Applying policy on delete");
                schema.pre("remove", function (next) {
                    /** @type {MongooseDocument} */
                    let doc = this;
                    /** @type {Query} */
                    let query = this;
                    let promises = [Promise.resolve()];
                    let policy;
                    if (_.isFunction(security_policies.delete)) {
                        policy = security_policies.delete(user, doc, request);
                        promises.push(Promise.resolve(policy));
                        if (policy instanceof Promise) {
                            promises.push(policy)
                        };
                    } /* else if (_.isObject(security_policies.delete)) {
                policy = security_policies.delete;
              } */
                    // policy = compilePolicyOptions(policy, {
                    //   $$user: user,
                    //   $$request: request,
                    //   $$doc: doc,
                    // })
                    Promise.all(promises).then(results => {
                        policy = results[results.length - 1];
                        if (policy) return next();
                        throw new SecurityMongooseError("Permission denied, for delete action", ERROR_CODES);
                    }, next)
                })
            }
        }

        function compilePolicyOptions(options, context) {
            var stringified = JSON.stringify(options);

            var replaced = stringified.replace(new RegExp("\"(\\$\\$[._a-z]*)\"", "gm"), `<%  print( JSON.stringify($1) ); %>`);
            var compile = _.template(replaced);
            var compiled = compile(context);

            let compiledPolicy = JSON.parse(compiled);
            return compiledPolicy;
        }
    }
}

export class SecurityMongooseError extends Error {
    code: number;
    constructor(message, errorCode, lineNumber?) {
        super(message);
        this.code = errorCode;
    }

}

enum ERROR_CODES {
    UNAUTHORIZED = 1,
    INVALID_POLICY = 2,
}

export interface ISecurityPolicy {
    create?: /* ICreateObjectPolicy | */ ICreateFunctionPolicy;
    read?: IReadObjectPolicy | IReadFunctionPolicy;
    update?: /* IUpdateObjectPolicy | */ IUpdateFunctionPolicy;
    delete?: /* IDeleteObjectPolicy | */ IDeleteFunctionPolicy;
}

/**
 * A function that can return boolean to prevent the action to be executed
 */
export interface ICreateObjectPolicy {
    [field: string]: string | object;
}
export interface ICreateFunctionPolicy {
    (user: IUserModel, doc: MongooseDocument, request?: Express.Request): boolean | ICreateObjectPolicy | Promise<ICreateObjectPolicy>
}

export interface IReadObjectPolicy {
    /**
     * Filters will be appended to the "find" query hook;
     * If boolean found on this field:
     *  true - will execute query without any modifications
     *  false - will throw error with permissions denied
     * If object passed
     */
    filters?: boolean | object;
    /**
     * Fields property defines the "select" fields, you can pass here 
     * the same definition tipe that mongoose .select() supports
     */
    fields?: string | {
        [field: string]: 1 | 0
    } | boolean;
}
export interface IReadFunctionPolicy {
    (user: IUserModel, request?: Express.Request): boolean | IReadObjectPolicy | Promise<IReadObjectPolicy>
}

export interface IUpdateObjectPolicy {
    [field: string]: any
}

/**
 * A function that can return boolean to prevent the action to be executed, a string with fields "space separated"
 * that define what fields could be updated
 * or and object to be defined
 */
export interface IUpdateFunctionPolicy {
    (user: IUserModel, doc: MongooseDocument, request?: Express.Request, query?: Query<any>): boolean | string | IUpdateObjectPolicy | Promise<IUpdateObjectPolicy>
}

export interface IDeleteObjectPolicy {

}
/**
 * A function that can return boolean to prevent the action to be executed,
 */
export interface IDeleteFunctionPolicy {
    (user: IUserModel, doc: MongooseDocument, request?: Express.Request): boolean | Promise<boolean>
}