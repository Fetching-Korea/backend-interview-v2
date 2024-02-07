import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  brandName: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  mainImage: string;
}
