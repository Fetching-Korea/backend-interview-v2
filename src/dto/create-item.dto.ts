import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateItemDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly brand: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly size: string;

  @IsString()
  readonly color: string;
}
