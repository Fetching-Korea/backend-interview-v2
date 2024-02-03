import { IsNotEmpty, IsString, IsInt, Min, Max, Length } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 1000)
  content: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  satisfaction_level: number;
}
