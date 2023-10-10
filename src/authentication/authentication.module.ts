import { Module } from '@nestjs/common';
import {AuthenticationController} from './authentication.controller';
import {AuthenticationService} from './authentication.service';
import {GoogleStrategy} from "./strategys/google.strategy";
import {PassportModule} from "@nestjs/passport";
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [PassportModule.register({session: false}), DatabaseModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, GoogleStrategy],
})
export class AuthenticationModule {}

