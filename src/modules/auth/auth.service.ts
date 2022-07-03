import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, redisService } from '../../utils';
import { UserEntity } from '../user/user.entity';
import { LoginResDto } from './dto/login-res.dto';
import { typeormService } from '../../utils';
import {
  ACCESS_TOKEN_EXPIRATION_INTERVAL,
  REFRESH_TOKEN_EXPIRATION_INTERVAL,
} from '../../environments';
import { uid } from 'rand-token';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await typeormService.source.getRepository(UserEntity).findOne({
      where: {
        email,
      },
    });

    if (user && (await comparePassword(password, user.password, user.salt))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...result } = user;

      return result;
    }

    return null;
  }

  async validateRefreshToken(refreshToken: string): Promise<any> {
    const userId = +(await redisService.source.getDel(
      `refresh-${refreshToken}`,
    ));
    if (!userId) return null;
    const user = await typeormService.source.getRepository(UserEntity).findOne({
      where: {
        id: userId,
      },
    });

    if (!user) return null;

    return user;
  }

  async login(user: UserEntity): Promise<LoginResDto> {
    const { id } = user;

    const refreshTokenExpiresIn = 60 * 60 * REFRESH_TOKEN_EXPIRATION_INTERVAL;
    const refreshToken = uid(255);
    await redisService.source
      .set(`refresh-${refreshToken}`, id)
      .then(async () => {
        await redisService.source.expire(
          `refresh-${refreshToken}`,
          refreshTokenExpiresIn,
        );
      });

    const AccessTokenExpiresIn = 60 * 60 * ACCESS_TOKEN_EXPIRATION_INTERVAL;
    const accessToken = this.jwtService.sign(
      { sub: id },
      {
        expiresIn: AccessTokenExpiresIn,
      },
    );

    return {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
