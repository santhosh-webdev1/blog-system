import { Controller, Get } from "@nestjs/common";
import { MailService } from "./mailer.service";



@Controller('auth')
export class AuthController{

    constructor(private readonly mailService : MailService){}

    @Get('test-mail')
    async sendTest(){
        return this.mailService.sendTestMail('santhosk.dev@gmail.com');
    }
    
}