import { isArray, isObject, isEmpty, isString } from 'lodash'
//@ts-ignore
import * as stripAnsi from 'strip-ansi';

export const responseErrorHandler = (err: any): IFormatedResponseError => {
    let formattedError: IFormatedResponseError = {
        message: '',
        error: true
    };

    if (isEmpty(err)) formattedError.message = 'Something went wrong. Try again.';

    if (isString(err)) formattedError.message = err;

    if (isObject(err)) {
        formattedError.message = err.errmsg || err.message;
        formattedError.errorCode = err.code;
        formattedError.stack = process.env.APP_ENVIRONMENT !== 'production' ? stripAnsi(err.stack) : null
    }

    if (isArray(err)) formattedError.message = err.map(err => err.message).join(' ');

    return formattedError;
}
export interface IFormatedResponseError {
    message: string
    errorCode?: number
    stack?: any
    error: boolean
}