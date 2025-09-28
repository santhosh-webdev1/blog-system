import { InjectRepository } from "@nestjs/typeorm";
import { MailService } from "src/mailer/mailer.service";
import { User } from "src/user/user.entity";
import { IsNull, Not, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { BadRequestException } from "@nestjs/common";
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt'
import { SetPasswordDto } from "./dto/set-password.dto";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";


export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly mailService: MailService,
        private readonly userService : UserService,
        private readonly jwtService : JwtService

    ) { }

    async register(dto: CreateUserDto) {

        const existing = await this.userRepository.findOne({ where: { email: dto.email } });
        if (existing) throw new BadRequestException("Email already exists");

        // generating activation token
        const rawToken = await crypto.randomBytes(32).toString('hex');

        // hashing the token for storing in db
        const tokenHash = await bcrypt.hash(rawToken, 10);

        // setting up the expiry token
        const expiry = new Date(Date.now() + 60 * 60 * 1000);

        const user = this.userRepository.create({
            name: dto.name,
            email: dto.email,
            activationToken: tokenHash,
            isVerfied: false,
            activationTokenExpiry: expiry
        })

        await this.userRepository.save(user);

        await this.mailService.sentActivationLink(dto.email, rawToken);

        return { message: 'Activation email sent successfully' };
    }


    async setPassword(dto : SetPasswordDto){

        const { email, token, password } = dto;

        const user = await this.userRepository.findOne({ where : {email }});

        if(!user) throw new BadRequestException("Invalid or missing token");

        if (!user.activationToken) {
            throw new BadRequestException('No active token. Please request a new reset link.');
        }

        const isMatch = await bcrypt.compare(token, user.activationToken);
        if(!isMatch) throw new BadRequestException("Invalid token");

        if(!user.activationTokenExpiry || user.activationTokenExpiry < new Date()){
            throw new BadRequestException("Link expired");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.activationToken = null;
        user.activationTokenExpiry = null;
        user.isVerfied = true;

        await this.userRepository.save(user);

        return { message : 'Password set successfully, please login with password'};
    }


    async validateToken(email : string, token : string){

        const user = await this.userService.findByEmail(email);

        if(!user) return { valid : true, reason : "User not found" };

        if (!user.activationToken) return { valid: false, reason: "Invalid token" };

        const isMatch = await bcrypt.compare(token, user.activationToken);

        if(!isMatch) return { valid : false, reason : "Invalid token"};

        if( !user.activationTokenExpiry || user.activationTokenExpiry < new Date()){
            return { valid : false, reason : "Token Expired"};
        }

        return { valid : true };
    }

    async validateUser(email : string, password : string){

        const user = await this.userService.findByEmail(email);

        if(!user) throw new BadRequestException("User not found");

        const match = await bcrypt.compare(password, user.password);

        if(!match) throw new BadRequestException("Invalid password");

        const { password : _pwd, ...safeUser} = user;

        return safeUser;
    }

    async login(user : any){
        
        const payload = { sub : user.id, email : user.email };

        const access_Token = this.jwtService.sign(payload);

        return { access_Token, user};
    }

}