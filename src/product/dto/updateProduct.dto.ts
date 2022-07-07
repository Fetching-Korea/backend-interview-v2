import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Color, Size } from '../entities/product.entity';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly desc: string;

  @IsNotEmpty()
  @IsString()
  readonly brand: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly size: Size;

  @IsNotEmpty()
  @IsString()
  readonly color: Color;
}
