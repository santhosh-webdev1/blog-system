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

    // async create(dto : CreateUserDto){
    //     const existing = await this.userRepo.findOne({ where: {email : dto.email}});

    //     if(existing) throw new BadRequestException("Email already exists");

    //     const hashed = await bcrypt.hash(dto.password, 10);

    //     const user = this.userRepo.create({...dto, password : hashed});

    //     return this.userRepo.save(user);
    // }

    // async login(dto : LoginUserDto){

    //     const existingUser = await this.userRepo.findOne({where : {email : dto.email}});
    //     if(!existingUser) throw new NotFoundException('User not found');

    //     const isValid = await bcrypt.compare(dto.password, existingUser.password);
    //     if(!isValid) throw new UnauthorizedException('Invalid credentials');

    //     const { password, ...result } = existingUser;

    //     return result;
    // }

    findById(id : number){
        return this.userRepo.findOne({where : { id }});
    }

}