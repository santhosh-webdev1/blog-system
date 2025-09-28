import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../auth/dto/create-user.dto";
import bcrypt from "node_modules/bcryptjs";
import { LoginUserDto } from "./dto/login-user.dto";



@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User) private readonly userRepo : Repository<User>,
    ) {}


    async findByEmail(email : string){
        return this.userRepo.findOne({where : {email}});
    }

    async findById(id : number){
        return this.userRepo.findOne({where : { id }});
    }

}