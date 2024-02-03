import { Optional } from '@nestjs/common';
import { IsInt, Length, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @Optional()
  @Length(10, 50)
  title?: string;

  @Optional()
  @Length(10, 500)
  content?: string;

  @Optional()
  @IsInt()
  @Min(1)
  @Max(5)
  satisfaction_level: number;
}
