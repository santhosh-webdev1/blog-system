import { Body, Controller, Get, Post } from "@nestjs/common";
import { MailService } from "../mailer/mailer.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";



@Controller('auth')
export class AuthController{

    constructor(private readonly authService : AuthService){}

    // @Get('test-mail')
    // async sendTest(){
    //     return this.mailService.sendTestMail('santhosk.dev@gmail.com');
    // }

    @Post('register')
    async register(@Body() dto : CreateUserDto){
        return this.authService.register(dto);
    }
    
}