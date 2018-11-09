import { Document, Types, Model } from "mongoose";
import { omit, isEmpty, find, isEqual } from "lodash";
import * as uniqueRandom from 'unique-random';
import * as sharp from "sharp";
import { normalize, basename, join } from "path";
import { outputFileSync } from "fs-extra";
import chalk from "chalk";
import { MODEL_NAME_DEFINITIONS, STORAGE_FOLDER } from "@server/utils/constants";
import { IFile } from "@shared/interfaces";
import { IFileModel } from "@server/models";

export const isIdValid = (id): boolean => id && Types.ObjectId.isValid(id);

export const findOneUpsert = (model: Model<any>, findObj: object, upsertObj?: object): Promise<any> => {
    return new Promise((resolve, reject) => {
        /**
         * Made in this way to have the searchWords array filled by the plugin
         */
        model
            .findOne(findObj)
            .then((document: Document) => {
                if (document) document.set(upsertObj && !isEmpty(upsertObj) ? upsertObj : findObj);
                else document = new model(upsertObj && !isEmpty(upsertObj) ? upsertObj : findObj);

                document
                    .save()
                    .then(docSaved => resolve(docSaved))
                    .catch(err => reject(err))
            })
            .catch(err => reject(err));
    });
};

export const appendRandomnStr = (str: string, customLength?: number) => {
    customLength = customLength || 15;
    if (str.length === customLength) return str;
    str += uniqueRandom(0, 9)();
    return appendRandomnStr(str, customLength);
}

export const isContentImage = (contentType: string): boolean => /image/.test(contentType);

export const getApiPath = (serverPath: string): string => serverPath.replace(`${normalize(process.env.STORAGE_FOLDER)}/`, '');

export const createThumbnail = (file: IFileModel): void => {
    let _id: string = file._id.toString();
    let thumbnailName: string = `thumbnail-${basename(_id)}.png`;
    let thumbnailPath: string = join(STORAGE_FOLDER, thumbnailName);
    let thumbnailApiPath: string = getApiPath(thumbnailPath);
    //Ignore older images and create a new thumb every time code lands here.
    sharp.cache(false);
    sharp(file.path)
        .resize(120, 120)
        .png()
        .toBuffer()
        .then(thumbnailBuffer => {
            outputFileSync(thumbnailPath, thumbnailBuffer);
            file
                .update(<IFile>{ thumbnailPath, thumbnailApiPath })
                .then(results => console.log(chalk.black.bgGreenBright(`Thumbnail created for: ${file.name}`)))
                .catch(err => console.error(chalk.redBright(err)));
        })
        .catch(err => console.error(chalk.redBright(err)));
};