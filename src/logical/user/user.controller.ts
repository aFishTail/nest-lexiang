import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService){}
    @Post('findOne')
    findOne(@Body() body: any) {
        console.log('进入‘fin', body)
        return this.userService.findOne(body.userName);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('register')
    async register(@Body() body: any) {
        return await this.userService.register(body)
    }
     // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  async login(@Body() loginParmas: any) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }
}
