import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post('findOne')
    findOne(@Body() body: any) {
        console.log('进入‘fin', body)
        return this.userService.findOne(body.userName);
    }
}
