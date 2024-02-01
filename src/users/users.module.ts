import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmExModule } from 'src/typeorm-setting/typeorm-ex.module';
import { UserRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { JWTStrategy } from './jwt.strategy';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  providers: [UsersService, JWTStrategy],
  controllers: [UsersController],
  exports: [JWTStrategy, PassportModule],
})
export class UsersModule {}
