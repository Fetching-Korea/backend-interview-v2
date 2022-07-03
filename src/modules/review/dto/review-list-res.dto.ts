import { ApiProperty } from '@nestjs/swagger';
import { ReviewEntity } from '../review.entity';

export class ReviewListResDto {
  @ApiProperty({
    example: [ReviewEntity],
    description: 'List of found products',
  })
  readonly list: ReviewEntity[];

  @ApiProperty({
    example: 30,
    description: 'Count of found products',
  })
  readonly count: number;
}
