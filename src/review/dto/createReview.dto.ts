import { IsNotEmpty, IsString } from 'class-validator';

export class ReviewDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly desc: string;
}
