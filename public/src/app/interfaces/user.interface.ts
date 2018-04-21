export interface IUser {
    _id: any;
    profileImg: string;
    email: string;
    username: string;
    socialId?: string;
    createdAt: Date;
    banned: boolean;
    roles: [ USER_ROLE ];
}

export enum USER_ROLE {
    ADMIN = "admin",
    USER = "user"
}