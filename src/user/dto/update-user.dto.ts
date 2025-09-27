import { IsEmail, IsOptional, Length } from "class-validator";



export class UpdateUserDto{

    @IsOptional()
    @Length(3, 20)
    name? : string;

    @IsOptional()
    @IsEmail()
    email? : string;

    @IsOptional()
    @Length(3, 20)
    password? : string;
}