// src/logical/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(userName: string, passwd: string): Promise<any> {
    const user = await this.authService.validateUser(userName, passwd);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
