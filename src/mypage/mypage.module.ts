import { Module } from '@nestjs/common';
import { MypageController } from './mypage.controller';
import { MypageService } from './mypage.service';
import { TypeOrmExModule } from 'src/typeorm-setting/typeorm-ex.module';
import { UserRepository } from 'src/users/users.repository';
import { UsersModule } from 'src/users/users.module';
import { CartRepository } from 'src/cart/cart.repository';

@Module({
  imports: [
    UsersModule,
    TypeOrmExModule.forCustomRepository([UserRepository, CartRepository]),
  ],
  controllers: [MypageController],
  providers: [MypageService],
})
export class MypageModule {}
