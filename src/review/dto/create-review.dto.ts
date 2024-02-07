import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10)
  score: number;

  @IsNotEmpty()
  content: string;
}
