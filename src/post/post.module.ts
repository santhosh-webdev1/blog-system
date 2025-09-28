import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/user/user.module";
import { Post } from "./post.entity";


@Module({
    imports : [
        TypeOrmModule.forFeature([Post]),
        UsersModule,
    ],
    controllers : [PostController],
    providers : [PostService],
    exports : [PostService]
})

export class PostModule{}