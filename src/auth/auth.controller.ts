import { BadRequestException, Body, Controller, Get, Post, Query, UnauthorizedException } from "@nestjs/common";
import { MailService } from "../mailer/mailer.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { SetPasswordDto } from "./dto/set-password.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { use } from "passport";



@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }


    @Post('validate-token')
    async validateToken(@Query('token') token: string) {
        if (!token) throw new BadRequestException('Token is required');
        return this.authService.validateToken(token);
    }

    @Post('set-password')
    async setPassword(@Body() dto: SetPasswordDto) {
        return this.authService.setPassword(dto);
    }

    @Post('login')
    async login(@Body() dto : LoginUserDto){
        const user = await this.authService.validateUser(dto.email, dto.password);

        if(!user) throw new UnauthorizedException("Invalid credentials");

        return this.authService.login(user);
    }


}