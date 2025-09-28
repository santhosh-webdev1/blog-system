import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { MailerModule } from "src/mailer/mailer.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { AuthService } from "./auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";



@Module({
    imports : [
        TypeOrmModule.forFeature([User]),
        MailerModule,

        ConfigModule,
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory : (config : ConfigService) =>({
                secret : config.get<string>('JWT_SECRET'),
                signOptions : { expiresIn : config.get<string>('JWT_EXPIRATION')}
            })
        })
    ],
    controllers : [AuthController],
    providers : [AuthService],
    exports : [AuthService]
})

export class AuthModule{}