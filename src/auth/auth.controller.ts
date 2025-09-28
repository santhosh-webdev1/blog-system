import { BadRequestException, Body, Controller, Get, Post, Query } from "@nestjs/common";
import { MailService } from "../mailer/mailer.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { SetPasswordDto } from "./dto/set-password.dto";



@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    // @Get('test-mail')
    // async sendTest(){
    //     return this.mailService.sendTestMail('santhosk.dev@gmail.com');
    // }

    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    // @Post('validate-token')
    // async validateToken(@Body() token : string){
    //     return this.authService.validateToken(token);
    // }

    @Post('validate-token')
    async validateToken(@Query('token') token: string) {
        if (!token) throw new BadRequestException('Token is required');
        return this.authService.validateToken(token);
    }

    @Post('set-password')
    async setPassword(@Body() dto: SetPasswordDto) {
        return this.authService.setPassword(dto);
    }


}