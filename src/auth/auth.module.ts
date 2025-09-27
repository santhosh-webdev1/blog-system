import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { MailerModule } from "src/mailer/mailer.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { AuthService } from "./auth.service";



@Module({
    imports : [
        TypeOrmModule.forFeature([User]),
        MailerModule
    ],
    controllers : [AuthController],
    providers : [AuthService]
})

export class AuthModule{}