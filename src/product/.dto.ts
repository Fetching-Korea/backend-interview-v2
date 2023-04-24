import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Min, Max } from 'class-validator';
import { Size } from 'src/enum/size';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  brand: string;
  @IsNumber()
  @Type(() => Number)
  price: number;
  @IsEnum(Size)
  size: Size;
  @IsString()
  color: string;
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  discount: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
