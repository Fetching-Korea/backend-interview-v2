import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsEntity } from './entity/goods.entity';
import { ColorEntity } from '../color/entity/color.entity';
import { SizeEntity } from './entity/size.entity';
import { ProductEntity } from '../product/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      GoodsEntity,
      ColorEntity,
      SizeEntity,
    ]),
  ],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
