import { IsNotEmpty, IsOptional } from 'class-validator';

// 옵션을 나타내는 DTO
export class ProductOptionDto {
  @IsOptional()
  size?: string;

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
