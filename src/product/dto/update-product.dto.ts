import { IsOptional } from 'class-validator';
type Size = string | number;

export class UpdateProductOptionDto {
  @IsOptional()
  size?: Size;

  @IsOptional()
  color?: string;

  @IsOptional()
  store?: number;
}

export class UpdateProductDto {
  @IsOptional()
  description?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  options?: UpdateProductOptionDto[];
}
