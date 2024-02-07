import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10)
  score: number;

  @IsNotEmpty()
  content: string;
}
