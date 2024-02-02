/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { ProductBrand } from './product-brand.entity';
import { ProductOption } from './product-option.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 0 })
  view_count: number;

  @Column()
  total_store: number;

  @OneToMany(() => ProductOption, (option) => option.product, { cascade: true })
  options: ProductOption[];

  @ManyToOne((type) => ProductBrand, (productBrand) => productBrand.products, {
    eager: true,
  })
  brand: ProductBrand;

  @ManyToOne(() => ProductCategory, (category) => category.products, {
    nullable: true,
  })
  category: ProductCategory;
}
