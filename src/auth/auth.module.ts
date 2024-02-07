import { PasswordBcryptEncrypt } from './password.bcrypt.encrypt';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
      global: true,
    }),
  ],
  controllers: [],
  providers: [PasswordBcryptEncrypt, AuthGuard],
  exports: [PasswordBcryptEncrypt, AuthGuard],
})
export class AuthModule {}
