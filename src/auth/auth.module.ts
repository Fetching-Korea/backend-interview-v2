import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@src/user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JWTUtilService } from './service/jwt-util.service';
import { JwtRefreshStrategy, JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [JwtModule.register({}), UserModule],
    controllers: [AuthController],
    providers: [
        { provide: AuthService, useClass: AuthService },
        { provide: JWTUtilService, useClass: JWTUtilService },
        JwtStrategy,
        JwtRefreshStrategy,
    ],
})
export class AuthModule {}
