import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseTimeEntity } from '../../common/base.entity';
import { ProductEntity } from '../../product/entity/product.entity';
import { ColorEntity } from '../../color/entity/color.entity';
import { SizeEntity } from '../../size/entity/size.entity';

@Entity('goods')
@Unique(['sizeId', 'colorId', 'productId'])
export class GoodsEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sizeId: number;

  @Column({ nullable: true })
  colorId: number;

  @Column()
  @Index()
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
