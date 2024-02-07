import { IsNotEmpty } from 'class-validator';

export class CreateGoodDto {
  @IsNotEmpty()
  sizeId: number;

  @IsNotEmpty()
  colorId: number;

  @IsNotEmpty()
  productId: number;
}
