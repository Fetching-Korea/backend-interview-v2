import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { GoodsEntity } from './entity/goods.entity';
import { ColorEntity } from './entity/color.entity';
import { SizeEntity } from './entity/size.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      GoodsEntity,
      ColorEntity,
      SizeEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
