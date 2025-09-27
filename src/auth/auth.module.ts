import { Module } from "@nestjs/common";
import { MailService } from "./mailer.service";
import { AuthController } from "./auth.controller";



@Module({
    controllers : [AuthController],
    providers : [MailService],
    exports : [MailService]
})

export class AuthModule{}