import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmExModule } from 'src/typeorm-setting/typeorm-ex.module';
import { UsersModule } from 'src/users/users.module';
import { ReviewRepository } from './review.repository';
import { ProductModule } from 'src/product/product.module';
import { ProductRepository } from 'src/product/product.repository';
import { ProductService } from 'src/product/product.service';
import { ProductOptionRepository } from 'src/product-option/product-option.repository';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    TypeOrmExModule.forCustomRepository([
      ReviewRepository,
      ProductRepository,
      ProductOptionRepository,
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ProductService, ProductRepository],
})
export class ReviewModule {}
