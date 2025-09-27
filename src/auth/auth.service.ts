import { InjectRepository } from "@nestjs/typeorm";
import { MailService } from "src/mailer/mailer.service";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { BadRequestException } from "@nestjs/common";
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt'


export class AuthService{

    constructor(
        @InjectRepository(User) private readonly userRepository : Repository<User>,
        private readonly mailService : MailService,
    ){}

    async register(dto : CreateUserDto){

        const existing = await this.userRepository.findOne({where : {email : dto.email}});
        if(existing) throw new BadRequestException("Email already exists");

        // generating activation token
        const rawToken = await crypto.randomBytes(32).toString('hex');

        // hashing the token for storing in db
        const tokenHash = await bcrypt.hash(rawToken, 10);

        // setting up the expiry token
        const expiry = new Date(Date.now() + 60 * 60 * 1000);

        const user = this.userRepository.create({
            name : dto.name,
            email : dto.email,
            activationToken : tokenHash,
            isVerfied : false,
        })

        await this.userRepository.save(user);

        await this.mailService.sentActivationLink(dto.email, tokenHash);

        return { message : 'Activation email sent successfully'};
    }
}