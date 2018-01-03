import { MongoError } from "mongodb";
import { Request, Response } from "express";
import { capitalize } from "lodash";

export class BaseController {

    private self = this;

    constructor() {

    }

    public handleError(error: MongoError | Error | any, req: Request, res: Response) {
        console.log(error);
        // console.log(new Error().stack)
        if(error instanceof MongoError ) {
            switch (error.code) {
                case 11000:
                    let key_exec = /index: (.*)_[1-9]{1}/.exec(error.message);
                    let key = key_exec[1];
                    if(key) {
                        error.message = `${capitalize(key)} already registered`;
                    } else {
                        error.message = `One of the fields provided is already registered on Database`;
                    }
                break;
            }
            return res.status(500).json({message: error.message, code: error.code})
        } else if( error instanceof Error) {
            res.status(500).json({})
        }
    }

}