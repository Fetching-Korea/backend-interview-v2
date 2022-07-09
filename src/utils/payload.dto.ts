import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PayloadDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsString()
  readonly username: string;
}
