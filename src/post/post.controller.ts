import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { AuthGuard } from "@nestjs/passport";
import { CreatePostDto } from "./dto/create-post.dto";
import { GetUser } from "src/auth/decorators/get-user.decorator";


@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostController{

    constructor(
        private readonly postService : PostService
    ) {}

    @Post()
    createPost(@Body() dto : CreatePostDto, @GetUser() user : any){
        return this.postService.create(dto, user);
    }

    
}