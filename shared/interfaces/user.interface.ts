export interface IUser {
    _id: string | any
    email: string,
    username: string,
    banned?: boolean,
    createdAt?: Date,
    profileImg?: string,
    roles?: Array<string>
}

export enum USER_ROLE {
    ADMIN = "admin",
    USER = "user"
}