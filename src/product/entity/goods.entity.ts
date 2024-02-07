import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from '../../common/base.entity';
import { ProductEntity } from './product.entity';
import { ColorEntity } from './color.entity';
import { SizeEntity } from './size.entity';

@Entity('goods')
export class GoodsEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sizeId: number;

  @Column({ nullable: true })
  colorId: number;

  @Column()
  productId: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => ColorEntity)
  @JoinColumn({ name: 'color_id' })
  color: ColorEntity;

  @ManyToOne(() => SizeEntity)
  @JoinColumn({ name: 'size_id' })
  size: SizeEntity;
}
