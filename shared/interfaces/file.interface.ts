import { IUser } from "@shared/interfaces";
export interface IFile {
    _id: any
    name: string
    mimeType: string
    path: string
    apiPath?: string
    type: string
    size: Number
    thumbnailPath: string
    thumbnailApiPath: string
    _uploadedBy: string | IUser
    createdAt?: Date
    updatedAt?: Date
}