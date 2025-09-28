import { Controller, Get } from "@nestjs/common";
import { GetUser } from "src/auth/decorators/get-user.decorator";


@Controller('/dashboard')
export class ProfileController{

    @Get('/home')
    getProfile(@GetUser() user : any){
        return user;
    }
}