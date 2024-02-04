import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { CartModule } from 'src/cart/cart.module';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmExModule } from 'src/typeorm-setting/typeorm-ex.module';
import { CartRepository } from 'src/cart/cart.repository';
import { ProductOptionRepository } from 'src/product-option/product-option.repository';
import { UsersModule } from 'src/users/users.module';
import { CartItemRepository } from './cart-item.repository';

@Module({
  imports: [
    CartModule,
    ProductModule,
    UsersModule,
    TypeOrmExModule.forCustomRepository([
      CartRepository,
      ProductOptionRepository,
      CartItemRepository,
    ]),
  ],
  providers: [CartItemService],
  controllers: [CartItemController],
})
export class CartItemModule {}
