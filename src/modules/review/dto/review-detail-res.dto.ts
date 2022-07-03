import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ReviewEntity } from '../review.entity';

export class ReviewDetailResDto {
  @ApiProperty({
    example: ReviewEntity,
    description: 'Product entity',
  })
  @IsNotEmpty()
  readonly review: ReviewEntity;
}
