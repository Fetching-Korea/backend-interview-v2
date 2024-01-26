// jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NjIyNjM0MywiaWF0IjoxNjk2MjI2MzQzfQ.kIR_AzU7MIjvv7zau5MTajQ668-YlCfMj-chP5p96bk', // JwtModule에서 설정한 시크릿 키와 일치해야 합니다.
    });
  }

  async validate(payload: any): Promise<any> {
    // JwtStrategy에서 유효한 토큰일 경우 호출되는 메서드
    // payload에는 토큰에 담겨있는 정보가 포함되어 있습니다.

    // 여기에서 payload에서 필요한 정보를 추출하고 반환하면 됩니다.
    const { sub, username, role } = payload;

    if (!sub || !username || !role) {
      throw new UnauthorizedException('Invalid token payload');
    }

    // 추출한 정보를 이용하여 유저를 조회하거나 다른 로직을 수행할 수 있습니다.
    const user = await this.authService.validateUserById(sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 필요한 정보를 반환합니다.
    return {
      userId: sub,
      username,
      role,
    };
  }
}
