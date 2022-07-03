import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ProductEntity } from '../product.entity';

export class ProductDetailResDto {
  @ApiProperty({
    example: ProductEntity,
    description: 'product entity',
  })
  @IsNotEmpty()
  readonly product: ProductEntity;
}
