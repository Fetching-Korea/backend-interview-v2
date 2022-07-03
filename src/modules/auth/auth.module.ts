import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import {
  ACCESS_TOKEN_EXPIRATION_INTERVAL,
  ACCESS_TOKEN_SECRET,
  ISSUER,
} from '../../environments';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secret: ACCESS_TOKEN_SECRET,
      signOptions: {
        issuer: ISSUER,
        expiresIn: ACCESS_TOKEN_EXPIRATION_INTERVAL,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
