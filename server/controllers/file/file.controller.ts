import { Request, Response, NextFunction } from "express";
import { File } from "@server/models";
import { responseErrorHandler, getDocsByQuery, isIdValid } from '@server/utils/helpers';
import * as HttpStatus from 'http-status-codes';
import { IResourceCreateResponse, IFile } from "@shared/interfaces";
import { ERROR_MESSAGES } from "@server/utils/constants";
export class FileController {

    public static list = (req: Request, res: Response, next: NextFunction) => {
        getDocsByQuery(File, req)
            .then(data => res.json(data))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseErrorHandler(err)));
    };

    public static delete = (req: Request, res: Response) => {
        let data: IFile = req.params
        if (!isIdValid(data._id)) return res.status(HttpStatus.BAD_REQUEST).json(responseErrorHandler(new Error(ERROR_MESSAGES.RESOURCE_ID_MISSING)));

        File.findByIdAndRemove(data._id)
            .then(file => {
                let message = file ? ERROR_MESSAGES.RESOURCE_DELETE : ERROR_MESSAGES.RESOURCE_NOT_FOUND;
                let status = file ? HttpStatus.OK : HttpStatus.NOT_FOUND;
                return res.status(status).json(<IResourceCreateResponse>{ message });
            })
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseErrorHandler(err)));
    };
};