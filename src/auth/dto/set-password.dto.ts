import { IsString, Length } from "class-validator";



export class SetPasswordDto{

    @IsString()
    token : string;

    @IsString()
    @Length(3, 20)
    password : string
}