import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../repository/user.repository';
import { User } from '../../entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmExModule } from '../../db/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
