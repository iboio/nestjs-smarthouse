import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {GoogleGuard} from "./guards/google.guard";
import {AuthenticationService} from "./authentication.service";
import {NewUserDto} from "../database/dto/new.user.dto";
import {DatabaseService} from "../database/database.service";
@Controller('api/auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService,
                private readonly databaseService: DatabaseService,) {
    }

    @Get('google')
    @UseGuards(GoogleGuard)
    async auth() {
        return { msg: 'google'};
    }
    @Get('google/callback')
    @UseGuards(GoogleGuard)
    async authCallback(@Req() req) {
        return this.authenticationService.googleLogin(req)
    }
    @Post('/register')
    User(@Body() message: NewUserDto){
        this.databaseService.newUser(message).then(r => console.log(r))
    }
    @Post('/login')
    async Login(@Body() userDTO: NewUserDto){
        const user = await this.databaseService.loginUser(userDTO);
        if(user != null){
            return this.databaseService.userData(userDTO)
        }
        return {msg: 'User not found'}
    }
}