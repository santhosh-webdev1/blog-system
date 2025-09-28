import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorators/get-user.decorator";



// decode the jwt and pass user object to request
@UseGuards(AuthGuard('jwt'))
@Controller('/auth')
export class ProfileController{

    @Get('/me')
    getProfile(@GetUser() user : any){
        return user;
    }
}