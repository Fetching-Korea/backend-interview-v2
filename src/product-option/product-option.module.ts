import { Module } from '@nestjs/common';
import { ProductOptionController } from './product-option.controller';
import { ProductOptionService } from './product-option.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmExModule } from 'src/typeorm-setting/typeorm-ex.module';
import { ProductOptionRepository } from './product-option.repository';
import { ProductRepository } from 'src/product/product.repository';
import { ReviewRepository } from 'src/review/review.repository';

@Module({
  imports: [
    UsersModule,
    TypeOrmExModule.forCustomRepository([
      ReviewRepository,
      ProductRepository,
      ProductOptionRepository,
    ]),
  ],
  controllers: [ProductOptionController],
  providers: [ProductOptionService],
})
export class ProductOptionModule {}
