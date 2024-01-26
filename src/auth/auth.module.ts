import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User]),
    JwtModule.register({
    secret: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NjIyNjM0MywiaWF0IjoxNjk2MjI2MzQzfQ.kIR_AzU7MIjvv7zau5MTajQ668-YlCfMj-chP5p96bk', // JWT 서명을 위한 시크릿 키
    signOptions: { expiresIn: '1h' }, // 토큰 만료 시간 (1시간)
  }),
],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
