import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  product: Product; 

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User; // 유저가 탈퇴했을 때 리뷰는 삭제되지 않도록

  @Column()
  title: string;

  @Column()
  desc: string; // description
}
