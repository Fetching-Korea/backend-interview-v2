import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './typeorm-setting/configs/typeorm.configs';
import { LikeModule } from './like/like.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UsersModule, ProductModule, LikeModule, OrderModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
