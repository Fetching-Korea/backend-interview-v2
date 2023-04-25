import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Min,
  Max,
  IsNumberString,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Size } from 'src/enum/size';
import { FindOperator, IsNull } from 'typeorm';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
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

export class FilterProductDto {
  @IsOptional()
  @IsNumberString()
  minPrice?: number;

  @IsOptional()
  @IsNumberString()
  maxPrice?: number;

  @IsNumberString()
  @IsOptional()
  maxDiscount?: number;

  @IsNumberString()
  @IsOptional()
  minDiscount?: number;

  @IsOptional()
  @IsString()
  brand?: string;
}

export class FilterDto {
  discount?: FindOperator<number>;

  price?: FindOperator<number>;

  brand?: FindOperator<string>;
}
