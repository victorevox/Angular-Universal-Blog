import { Document, Schema, Model, model, Types } from "mongoose";
import { values } from 'lodash';
import { remove } from "fs-extra";
import chalk from "chalk";
import { IFile } from "@shared/interfaces";
import { MODEL_NAME_DEFINITIONS } from "@server/utils/constants";
import { FILE_TYPES } from "@shared/constants/file.constants";

export let FileSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    mimeType: {
        type: String
    },
    path: {
        type: String,
        required: true
    },
    apiPath: {
        type: String,
        required: true
    },
    _uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAME_DEFINITIONS.USER,
        required: true
    },
    type: {
        type: String,
        enum: values(FILE_TYPES),
        required: true
    },
    size: {
        type: Number
    },
    thumbnailPath: {
        type: String
    },
    thumbnailApiPath: {
        type: String
    }
}, { timestamps: true });
/* Hooks */
//Remove thumbnails files after removed file.
FileSchema.post('remove', function (file: IFileModel) {
    remove(file.thumbnailPath)
        .then(() => console.log(chalk.black.bgGreenBright("File thumbnail removed.")))
        .catch(err => console.error(chalk.redBright(err)));
});

export let File: Model<IFileModel> = model<IFileModel>(MODEL_NAME_DEFINITIONS.FILE, FileSchema);
export interface IFileModel extends IFile, Document {

}