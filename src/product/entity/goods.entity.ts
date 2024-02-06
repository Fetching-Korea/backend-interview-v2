import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../common/base.entity';

@Entity('goods')
export class GoodsEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  sizeId: string;

  @Column()
  colorId: string;

  @Column()
  productId: string;
}
