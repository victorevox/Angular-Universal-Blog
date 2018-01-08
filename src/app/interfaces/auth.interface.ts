export enum AUTH_TYPES {
    SIGNUP = "signup",
    LOGIN = "login",
    FACEBOOK = "facebook"
}

export interface ILoginCredentials {
    email: string,
    password: string
}

export interface ISignupCredentials extends ILoginCredentials {
    confirmpassword: string,
    username: string
}

export interface ILoginResponse {
    token: string;
    message: string;
}

export enum AUTH_EVENT_TYPES {
    SIGNUP = "signup",
    LOGIN = "login",
    LOGOUT = "logout",
    UPDATE = "update"
}

export interface IAuthenticationEvent {
    type: AUTH_EVENT_TYPES
}

export enum AUTH_SOCIAL_STATUS {
    SUCCESS,
    FAIL
}