import { PartialType } from '@nestjs/mapped-types';
import { ProductCreateDto } from './create-product.dto';
import { IsNotEmpty } from 'class-validator';

export class ProductUpdateDto extends PartialType(ProductCreateDto) {
  @IsNotEmpty()
  id: number;
}
