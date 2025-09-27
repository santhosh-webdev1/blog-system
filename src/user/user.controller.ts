import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";



@Controller('users')
export class UserController{

    constructor(private readonly userService : UserService){}

    @Post('/register')
    register(@Body() dto : CreateUserDto){
        return this.userService.create(dto);
    }

    @Post('/login')
    login(@Body() dto : LoginUserDto){
        return this.userService.login(dto);
    }

    // id is like a placeholder value request is users/10
    @Get(':id')
    findById(@Param('id') id : string){
        return this.userService.findById(Number(id));
    }

}