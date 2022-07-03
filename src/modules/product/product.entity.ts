import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum EnumOrderBy {
  NAME_ASC,
  NAME_DESC,
  BRAND_ASC,
  BRAND_DESC,
  PRICE_ASC,
  PRICE_DESC,
  SIZE_ASC,
  SIZE_DESC,
}

export enum EnumSizes {
  XXXXS,
  XXXS,
  XXS,
  XS,
  S,
  M,
  L,
  XL,
  XXL,
  XXXL,
  XXXXL,
}

export enum EnumColors {
  RED,
  ORANGE,
  YELLOW,
  GREEN,
  BLUE,
  PURPLE,
  PINK,
  BLACK,
  GRAY,
  WHITE,
}

@Entity({
  name: 'product',
  orderBy: {
    createdAt: 'ASC',
  },
})
@Index('IDX_PRODUCT_NAME', ['name'], { unique: false })
@Index('IDX_PRODUCT_BRAND', ['brand'], { unique: false })
@Index('IDX_PRODUCT_PRICE', ['price'], { unique: false })
@Index('IDX_PRODUCT_SIZE', ['size'], { unique: false })
@Index('IDX_PRODUCT_COLOR', ['color'], { unique: false })
@Index('IDX_PRODUCT_BRAND_SIZE', ['brand', 'size'], { unique: false })
@Index('IDX_PRODUCT_BRAND_COLOR', ['brand', 'color'], { unique: false })
@Index('IDX_PRODUCT_SIZE_COLOR', ['size', 'color'], { unique: false })
@Index('IDX_PRODUCT_BRAND_SIZE_COLOR', ['brand', 'size', 'color'], {
  unique: false,
})
export class ProductEntity {
  @ApiProperty({ description: 'id of product' })
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @ApiProperty({ description: 'name of product' })
  @Column({
    type: 'varchar',
    length: 32,
    name: 'name',
    unique: true,
    nullable: false,
  })
  name: string;

  @ApiProperty({ description: 'description of product' })
  @Column({
    type: 'varchar',
    length: 128,
    name: 'description',
    nullable: false,
  })
  description: string;

  @ApiProperty({ description: 'brand of product' })
  @Column({
    type: 'varchar',
    length: 32,
    name: 'brand',
    nullable: false,
  })
  brand: string;

  @ApiProperty({ description: 'price of product' })
  @Column({
    type: 'int',
    name: 'price',
    nullable: false,
  })
  price: number;

  @ApiProperty({
    enum: EnumSizes,
    example: '5',
    description: 'size of product',
  })
  @Column({
    type: 'enum',
    enum: EnumSizes,
    name: 'size',
    nullable: false,
  })
  size: EnumSizes;

  @ApiProperty({
    enum: EnumColors,
    example: '6',
    description: 'color of product',
  })
  @Column({
    type: 'enum',
    enum: EnumColors,
    name: 'color',
    nullable: false,
  })
  color: EnumColors;

  @ApiProperty({ description: 'created timestamp of product' })
  @Column({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({ description: 'updated timestamp of product' })
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    nullable: false,
  })
  updatedAt: Date;

  constructor(partial: Partial<ProductEntity>) {
    if (partial) {
      Object.assign(this, partial);
      this.createdAt = this.createdAt || new Date();
      this.updatedAt = new Date();
    }
  }
}
