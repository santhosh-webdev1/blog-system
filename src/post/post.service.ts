import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./post.entity";
import { UserService } from "src/user/user.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class PostService{

    constructor(
        @InjectRepository(Post) private postRepository : Repository<Post>,
        private readonly userService : UserService,
    ) {}

    async create(dto : CreatePostDto, userPayload : any){
        const user = await this.userService.findById(userPayload.id);
        
        if(!user) throw new NotFoundException("User not found");

        const post = this.postRepository.create({
            ...dto, 
            user,
        })

        return this.postRepository.save(post);
    }
}