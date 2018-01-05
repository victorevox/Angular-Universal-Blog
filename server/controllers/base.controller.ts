import { MongoError } from "mongodb";
import { Model } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { capitalize } from "lodash";
import { USER_ROLE, IUser, IResourceListResponse } from "../../src/app/interfaces";
import { isEmpty } from "lodash";

export class BaseController {

    private self = this;
    private _req: Request;
    private _res: Response;
    private _model: Model<any>;
    private _next: NextFunction;

    constructor() {

    }

    private setController(req: Request, res: Response, model: any, next?: NextFunction) {
        this._req = req,
            this._res = res;
        this._model = model;
        this._next = next;
    }

    public _list(req: Request, res: Response, model: Model<any>, next?: NextFunction) {
        let query = null;
        let response: IResourceListResponse;
        if (req.params.id) {
            query = model.findById(req.params.id);
        }
        else if (!isEmpty(req.query)) {
            response = { documents: [] };
            let queryParams = req.query;
            if (queryParams.filter) {
                let filter = queryParams.filter;
                if(filter.where) {
                    let where = filter.where;
                    for (const key in where) {
                        query = model.where(key, where[key]);
                    }
                } else {
                    this.handleError(new Error("Filter not supported"), req, res);
                }
            } else {
                this.handleError(new Error("Bad request"), req, res);
            }
            // return res.status(200).json( { message: queryParams } )
        }
        else {
            query = model.find({});
        }
        query.exec().then(posts => {
            response = { documents: posts };
            return res.status(200).json(response)
        }).catch(err => {
            this.handleError(err, req, res);
        })
    }

    public handleError(error: MongoError | Error | any, req: Request, res: Response) {
        console.log(error);
        // console.log(new Error().stack)
        if (error instanceof MongoError) {
            switch (error.code) {
                case 11000:
                    let key_exec = /index: (.*)_[1-9]{1}/.exec(error.message);
                    let key = key_exec[1];
                    if (key) {
                        error.message = `${capitalize(key)} already registered`;
                    } else {
                        error.message = `One of the fields provided is already registered on Database`;
                    }
                    break;
            }
            return res.status(500).json({ message: error.message, code: error.code })
        } else if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }

    /**
     * checkAuthentication
     */
    public isAuthenticated(req: Request, role?: USER_ROLE | Array<USER_ROLE>): boolean {
        if (!req.user) {
            return false;
        }
        if (!role) {
            return this.isDefaultAuthenticated(req);
        } else if (role instanceof Array) {
            let res = role.reduce((prev, curr) => {
                let r = (<IUser>req.user).roles.indexOf(curr) !== -1;
                let n = r ? 1 : 0;
                return prev * n;
            }, 1);
            return res ? true : false
        }
        else if (typeof role === "string") {
            return (<IUser>req.user).roles.indexOf(role) !== -1;
        }
        else return true;
    }

    private isDefaultAuthenticated(req: Request): boolean {
        if (!req.user) {
            return false;
        }
        return (<IUser>req.user).roles.indexOf(USER_ROLE.USER) !== -1;
    }

}