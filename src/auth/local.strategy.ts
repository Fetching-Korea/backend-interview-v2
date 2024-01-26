// local.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { loginFrom } from './dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(loginFrom: loginFrom): Promise<any> {
    // 사용자를 찾아 인증을 수행하는 메서드
    const user = await this.authService.validateUser(loginFrom);
    if (!user) {
      // 인증 실패 시 에러 처리
      throw new UnauthorizedException();
    }
    return user;
  }
}
