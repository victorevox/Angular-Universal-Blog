import * as passport from "passport";
import * as passportLocal from "passport-local";
import { User, IUserModel } from "./../models/User";
import { Application } from "express";
import * as FacebookStrategy from "passport-facebook";
import { USER_ROLE } from "./../../src/app/interfaces";

const LocalStrategy = passportLocal.Strategy;

export class PassportConfig {

    public static config(app: Application) {
        // app.use(passport.initialize());

        passport.use('local', new LocalStrategy({ usernameField: "email" },
            (username, password, done) => {
                User.findOne(<IUserModel>{ email: username }).then((user) => {
                    if (!user) {
                        return done(null, false, {
                            message: 'User not found'
                        });
                    }
                    if (user.banned) {
                        return done(null, false, {
                            message: 'Your account has been suspended'
                        });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, {
                            message: 'Wrong Password'
                        });
                    }
                    return done(null, user);
                }, (err) => {
                    if (err) {
                        return done(err);
                    }
                })
            }
        ));

        let host = process.env.APP_DOMAIN || '';
        passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID || '',
            clientSecret: process.env.FACEBOOK_APP_SECRET || '',
            callbackURL: `${host}/api/authentication/facebook/callback`,
            profileFields: ['id', 'email', 'name'],
        },
            function (accessToken, refreshToken, profile, cb) {
                let email = profile.emails[0];
                email = email && email.value ? email.value : email;
                User.findOne({ socialId: profile.id, email: email }, function (err, user) {
                    if (err || user) {
                        return cb(err, user);
                    }
                    if (!user) {
                        console.log(profile);
                        user = new User();
                        user.email = email;
                        user.username = email;
                        user.socialId = profile.id;
                        user.roles = [USER_ROLE.USER];
                        user.save((err, user) => {
                            return cb(err, user);
                        })
                    }
                });
            }
        ));

        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });

        app.use(passport.initialize());

    }
}
