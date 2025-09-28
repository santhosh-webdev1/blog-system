import { Controller, Get } from "@nestjs/common";
import { GetUser } from "src/auth/decorators/get-user.decorator";


@Controller('/auth')
export class ProfileController{

    @Get('/me')
    getProfile(@GetUser() user : any){
        return user;
    }
}