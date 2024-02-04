import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { CartModule } from 'src/cart/cart.module';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmExModule } from 'src/typeorm-setting/typeorm-ex.module';
import { CartRepository } from 'src/cart/cart.repository';

@Module({
  imports: [
    CartModule,
    ProductModule,
    TypeOrmExModule.forCustomRepository([CartRepository]),
  ],
  providers: [CartItemService],
  controllers: [CartItemController],
})
export class CartItemModule {}
