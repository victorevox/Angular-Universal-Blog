import { Schema, Model, connection, ModelPopulateOptions, Query } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { merge, isEmpty, isObject, isString, isBoolean } from "lodash";
import { ERROR_MESSAGES } from "@server/utils/constants/messages.constants";

export class CrudMiddleware {

    public static init(schema: Schema, options) {
        schema.static("$$read", function (options) {
            return function (req: Request, res: Response, next: NextFunction) {
                function isValid(object) {
                    for (const optionKey in object) {
                        let option = object[optionKey];
                        switch (optionKey) {
                            case "select":
                                if (!isString(option)) return false;
                                break;
                            case "options":
                                if (!isObject(option)) return false;
                                break;
                            case "match":
                                if (!isObject(option)) return false;
                                break;
                        }
                        return true;
                    }
                }
                return new Promise((resolve, reject) => {
                    let defaultOptions = {
                        ignoreCompanyRelation: false
                    }
                    // set options
                    options = merge(defaultOptions, options);
                    let query = null;
                    let response;
                    let queryParams: IQueryParams = {};
                    let id = req.params.id || req.query._id;
                    if (id) {
                        query = schema.model.findById(id);
                    } else {
                        query = schema.model.find({});
                    }
                    if (!isEmpty(req.query)) {
                        response = {
                            documents: []
                        };
                        queryParams = req.query;
                        if (!queryParams.es) {
                            if (queryParams.filter) {
                                let filter = typeof queryParams.filter === "string" && JSON.parse(queryParams.filter) || req.query.filter;
                                if (filter.where) {
                                    let where = filter.where;
                                    for (const key in where) {
                                        query = query.where(key, where[key]);
                                    }
                                }
                                if (filter.sort) {
                                    query = query.sort(filter.sort);
                                }
                                if (filter.limit) {
                                    query = query.limit(filter.limit);
                                }
                            }
                            if (queryParams.populate) {
                                let populate = typeof queryParams.populate === "string" && JSON.parse(queryParams.populate) || req.query.populate;
                                if (isObject(populate)) {
                                    for (const fieldKey in populate) {
                                        let field = populate[fieldKey]
                                        if (isString(field) || isBoolean(field)) {
                                            query.populate(fieldKey);
                                        } else if (isObject(field) && isValid(field)) {
                                            field.path = fieldKey;
                                            query.populate(field)
                                        }
                                    }
                                } else {
                                    throw new Error(ERROR_MESSAGES.BAD_REQUEST);
                                }
                            }
                        } else if (queryParams.es_query) {
                            //do elastic search 
                            let es_query = queryParams.es_query && JSON.parse(queryParams.es_query) || queryParams.es_query;
                            if (schema.model.esSearch) {
                                query = schema.model.esSearch(es_query);
                            } else {
                                throw new Error(ERROR_MESSAGES.BAD_REQUEST)
                            }

                        } else {
                            if (!queryParams.es_query) throw new Error(ERROR_MESSAGES.NO_QUERY);
                        }
                        // return res.status(200).json( { message: queryParams } )
                    }

                    query.then(docs => {
                        docs = queryParams.es_query && queryParams.es_raw && docs || queryParams.es_query && docs.hits && docs.hits.hits || docs;
                        if (queryParams.es_query && !queryParams.es_raw && !queryParams.es_nested_source) {
                            docs = docs.map(doc => {
                                let newDoc = doc._source || {};
                                newDoc._id = doc._id;
                                newDoc._score = doc._score;
                                return newDoc;
                            })
                        }
                        resolve(docs);
                    }).catch(err => {
                        reject(err);
                    })
                })
            }
        });
    }
}

interface IQueryParams {
    es?: boolean,
    es_query?: any,
    es_raw?: any,
    es_nested_source?: boolean,
    filter?: {
        where?: {
            [field: string]: any
        },
        sort?: {
            [field: string]: [1, 2]
        },
        limit?: number
    },
    populate?: string | {
        [field: string]: boolean | {
            match?: any,
            options?: any,
            populate?: ModelPopulateOptions,
            model?: any,
            select?: any
        }
    },
}