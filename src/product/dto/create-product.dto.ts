import { IsNotEmpty, IsOptional } from 'class-validator';

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

  @IsNotEmpty()
  options?: ProductOptionDto[];

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  category: string;
}
