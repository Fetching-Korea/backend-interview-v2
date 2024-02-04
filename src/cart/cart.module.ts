import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmExModule } from 'src/typeorm-setting/typeorm-ex.module';
import { ProductOptionModule } from 'src/product-option/product-option.module';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/users/users.module';
import { CartRepository } from './cart.repository';
import { CartItemRepository } from 'src/cart-item/cart-item.repository';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    ProductOptionModule,
    TypeOrmExModule.forCustomRepository([CartRepository, CartItemRepository]),
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
