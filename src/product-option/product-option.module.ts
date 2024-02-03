import { Module } from '@nestjs/common';
import { ProductOptionController } from './product-option.controller';
import { ProductOptionService } from './product-option.service';

@Module({
  controllers: [ProductOptionController],
  providers: [ProductOptionService],
})
export class ProductOptionModule {}
