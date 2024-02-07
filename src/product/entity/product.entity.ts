import { BaseTimeEntity } from '../../common/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GoodsEntity } from '../../goods/entity/goods.entity';
import { ReviewEntity } from '../../review/review.entity';

@Entity('product')
export class ProductEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  brandName: string;

  @Column()
  price: number;

  @Column()
  mainImage: string;

  @Column({ default: 0 })
  reviewCount: number;

  @OneToMany(() => GoodsEntity, (goods) => goods.product)
  goods: GoodsEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];
}
