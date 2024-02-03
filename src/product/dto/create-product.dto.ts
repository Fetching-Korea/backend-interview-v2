import {
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

// 옵션을 나타내는 DTO
type Size = string | number;

export class ProductOptionDto {
  @IsOptional()
  size?: Size;

  @IsOptional()
  color?: string;

  @IsNotEmpty()
  store: number;
}

// 상품 생성 DTO
export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductOptionDto)
  options?: ProductOptionDto[];

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  category: string;
}
