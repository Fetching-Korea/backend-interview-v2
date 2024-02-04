import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { UsersModule } from 'src/users/users.module';
import { ProductOptionModule } from 'src/product-option/product-option.module';
import { ProductModule } from 'src/product/product.module';
import { ReviewRepository } from 'src/review/review.repository';
import { ProductRepository } from 'src/product/product.repository';
import { ProductOptionRepository } from 'src/product-option/product-option.repository';
import { TypeOrmExModule } from 'src/typeorm-setting/typeorm-ex.module';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    ProductOptionModule,
    TypeOrmExModule.forCustomRepository([
      ReviewRepository,
      ProductRepository,
      ProductOptionRepository,
    ]),
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
