import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (_configService: ConfigService) => ({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '1h' }
    }),
    inject: [ConfigService]
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}