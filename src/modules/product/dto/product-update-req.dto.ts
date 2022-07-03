import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { EnumColors, EnumSizes } from '../product.entity';

export class ProductUpdateReqDto {
  @ApiProperty({
    example: 'colorful bag',
    description: 'name',
  })
  @Length(1, 32)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'The colorful bag',
    description: 'description',
  })
  @Length(1, 128)
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    example: 'NIKE',
    description: 'brand name',
  })
  @Length(1, 32)
  @IsNotEmpty()
  readonly brand: string;

  @ApiProperty({
    example: 100000,
    description: 'price',
  })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    example: EnumSizes.M,
    enum: EnumSizes,
    description: 'size',
  })
  @IsNotEmpty()
  readonly size: EnumSizes;

  @ApiProperty({
    example: EnumColors.PINK,
    enum: EnumColors,
    description: 'color',
  })
  @IsNotEmpty()
  readonly color: EnumColors;
}
