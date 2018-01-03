import * as passport from "passport";
import * as passportLocal from "passport-local";
import { User, IUserModel } from "./../models/User";
import { Application } from "express";

const LocalStrategy = passportLocal.Strategy;

export class PassportConfig {

    public static config (app: Application) {
        // app.use(passport.initialize());
        
        let pass = passport.use( 'local', new LocalStrategy({ usernameField: "email" },
            (username, password, done) => {
                User.findOne(<IUserModel>{ email: username}).then((user) => {
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

        app.use(passport.initialize());

    }
}
