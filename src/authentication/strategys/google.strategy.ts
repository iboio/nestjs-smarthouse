import {PassportStrategy} from "@nestjs/passport";
import {Strategy, Profile} from "passport-google-oauth20";
import {Injectable} from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '914549449547-utsko09pjslk7qiuud6lo46lvtt1ag74.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: "http://localhost:3000/auth/google/callback",
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        console.log(profile);
        done(null, profile)
    }
}