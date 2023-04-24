import { Module } from '@nestjs/common';
import { AuthService } from './.service';
import { UserModule } from '../User/.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 3600 },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    // LocalStrategy,
    // JwtStrategy
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
