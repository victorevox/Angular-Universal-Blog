// var mongoose = require('mongoose');
import { Document, Schema, Model, model, Types } from "mongoose";
import { randomBytes, pbkdf2Sync } from "crypto";
import * as jwt from "jsonwebtoken";
import { IUser } from "@shared/interfaces/user.interface";
import { MODEL_NAME_DEFINITIONS } from "@server/utils/constants";
import { hashSync, compareSync } from "bcrypt"
import * as moment from 'moment';

const HASH_COST = 10;

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
    let user = <IUserModel>this;
    if (!user.createdAt) {
        user.createdAt = now;
    }
    next();
});

UserSchema.methods.setConfirmAccountToken = function () {
    this.confirmAccountToken = randomBytes(3).toString('hex');
};

UserSchema.methods.setForgotPasswordToken = function () {
    this.forgotPasswordToken = randomBytes(16).toString('hex');
    this.forgotPasswordTokenExpires = moment().add(1, 'hour');
};

UserSchema.methods.savePassword = function (password) {
    if (!password) throw new Error("User must contain a password");
    this.hash = hashSync(password, HASH_COST);
};

UserSchema.methods.validPassword = function (password) {
    return compareSync(password, this.hash);
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

export var User: Model<IUserModel> = model<IUserModel>(MODEL_NAME_DEFINITIONS.USER, UserSchema);

export interface IUserModel extends IUser, Document {
    hash?: string;
    salt?: string;

    savePassword(password: string);
    generateJwt(): string;
    validPassword(password: string): boolean

    socialId?: string;
    banned?: boolean;

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