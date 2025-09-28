import { IsString, Length } from "class-validator";



export class CreatePostDto{

    @IsString()
    @Length(3, 150,{ message : 'Title must be between 3 and 150 characters'})
    title : string;

    @IsString()
    @Length(10, 5000, { message : 'Content must be at least 10 characters' })
    content : string;
}