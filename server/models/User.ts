// var mongoose = require('mongoose');
import { Document, Schema, Model, model, Types } from "mongoose";
import { randomBytes, pbkdf2Sync } from "crypto";
import * as jwt from "jsonwebtoken";
import { IUser } from "./../../src/app/interfaces";

export var UserSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    profileImg: {
        type: String
    },
    roles: [{
        type: String,
        required: true
    }],
    permissions: [{
        type: String
    }],
    username: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    banned: {
        type: Boolean,
        default: false
    },
    socialId: {
        index: true,
        type: String
    },
    salt: {
        type: String,
        // required: true
    },
    hash: {
        type: String,
        // required: true
    },
    createdAt: {
        type: Date
    }
})

UserSchema.pre("save", function (next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

UserSchema.methods.savePassword = function (password)  {
    if (password) {
        this.salt = randomBytes(16).toString('hex');
        this.hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    } else {
        throw new Error("User must contain a password");
    }
};

UserSchema.methods.validPassword = function (password) {
    var hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.statics.validateToken = function (token) {
    return jwt.verify(token, process.env.JWT_SECRET || "MY_SECRET");
  }

UserSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    var token = jwt.sign(<IUser>{
        _id: this._id,
        username: this.username,
        banned: this.banned,
        email: this.email,
        roles: this.roles,
        createdAt: this.createdAt,
        profileImg: this.profileImg,
        exp: Math.round(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET || "MY_SECRET");
    return token;
};

export var User: Model<IUserModel> = model<IUserModel>("User", UserSchema);

export interface IUserModel extends IUser, Document {
    hash: string;
    salt: string;

    savePassword(password: string);
    generateJwt(): string;
    validPassword(password: string): boolean

    //public static validateToken(token: string){}    

}

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        return {
            email: ret.email,
            username: ret.username,
            banned: ret.banned,
            createdAt: ret.createdAt,
            profileImg: ret.profileImg,
            roles: ret.roles
        };
    }
});

// export abstract class UserModel implements IUserModel {
//     constructor(parameters) {
        
//     }

//     _id;
//     __v;
//     banned;
//     base;

//     hash;
//     salt;

//     savePassword(password: string){};
//     validPassword(password: string){};
//     generateJwt(){};

//     public static validateToken(token: string){}    
    
// }