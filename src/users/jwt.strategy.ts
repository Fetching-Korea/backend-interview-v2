import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './users.repository';
import { User } from './user.entity';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload) {
    const { nickname } = payload;
    const user: User = await this.userRepository.findOne({
      where: { nickname },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
