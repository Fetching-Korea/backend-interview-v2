import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../product.entity';

export class ProductListResDto {
  @ApiProperty({
    example: [ProductEntity],
    description: 'List of found products',
  })
  readonly list: ProductEntity[];

  @ApiProperty({
    example: 30,
    description: 'Count of found products',
  })
  readonly count: number;
}
