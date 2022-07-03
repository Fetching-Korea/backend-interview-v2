import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class ReviewUpdateReqDto {
  @ApiProperty({
    example: 1,
    description: 'product',
  })
  @IsNotEmpty()
  readonly product: number;

  @ApiProperty({
    example: 'great!',
    description: 'content',
  })
  @Length(1, 65535)
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({
    example: 10,
    description: 'score (0 to 10)',
  })
  @IsNotEmpty()
  readonly score: number;
}
