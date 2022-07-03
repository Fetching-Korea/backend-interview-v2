import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ACCESS_TOKEN_SECRET } from '../../environments';
import { UserEntity } from '../user/user.entity';
import { typeormService } from '../../utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      const { sub } = payload;

      const rawUser = await typeormService.source
        .getRepository(UserEntity)
        .findOneOrFail({
          where: {
            id: sub,
          },
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...user } = rawUser;

      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
