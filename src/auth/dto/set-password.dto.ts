import { IsEmail, IsString, Length } from "class-validator";



export class SetPasswordDto{


    @IsEmail()
    email : string;

    @IsString()
    token : string;

    @IsString()
    @Length(3, 20)
    password : string
}