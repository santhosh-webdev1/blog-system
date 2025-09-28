import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Post } from "src/post/post.entity";
import { Comment} from "src/comment/comment.entity"


@Module({
    imports : [
        ConfigModule.forRoot({ isGlobal : true}), // loading .env
        TypeOrmModule.forRootAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory : (config : ConfigService) => ({
                type : 'postgres',
                host : config.get<string>('DB_HOST'),
                port : config.get<number>('DB_PORT'),
                username : config.get<string>('DB_USER'),
                password : config.get<string>('DB_PASS'),
                database : config.get<string>('DB_NAME'),
                autoLoadEntities : true,
                synchronize : true,
                logging : true,
                entities : [User, Post, Comment],
            })
        })
    ],
})

export class DatabaseModule{}