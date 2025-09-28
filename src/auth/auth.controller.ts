import { BadRequestException, Body, Controller, Get, Post, Query, Res, UnauthorizedException } from "@nestjs/common";
import { MailService } from "../mailer/mailer.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { SetPasswordDto } from "./dto/set-password.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import type { Response } from "express";



@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }


    @Post('validate-token')
    async validateToken(@Query('token') token: string, @Query('email') email : string) {
        if (!token) throw new BadRequestException('Token is required');
        return this.authService.validateToken(email, token);
    }

    @Post('set-password')
    async setPassword(@Body() dto: SetPasswordDto) {
        return this.authService.setPassword(dto);
    }

    // @Post('login')
    // async login(@Body() dto : LoginUserDto){
    //     const user = await this.authService.validateUser(dto.email, dto.password);

    //     if(!user) throw new UnauthorizedException("Invalid credentials");

    //     return this.authService.login(user);
    // }


    @Post('testlogin')
    async testLogin(@Body() dto : LoginUserDto, @Res({passthrough : true}) res : Response){

        const user = await this.authService.validateUser(dto.email, dto.password);

        if(!user) throw new UnauthorizedException("Invalid credentials");

        const { access_Token, user : safeUser} = await this.authService.login(user);

        res.cookie('jwt', access_Token,{
            httpOnly : true,
            secure : false,
            sameSite : 'lax',
            maxAge : 60 * 60 * 1000 // 1 hour
        })

        return { user : safeUser};
    }
}