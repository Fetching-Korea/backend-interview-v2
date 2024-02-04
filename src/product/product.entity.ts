import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Review } from 'src/review/review.entity';
import { ProductOption } from 'src/product-option/product-option.entity';
import { Like } from 'src/like/like.entity';
import { CartItem } from 'src/cart-item/cart-item.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 1 })
  view_count: number;

  @Column()
  total_store: number;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  category: string;

  @OneToMany(() => ProductOption, (productOption) => productOption.product) // ProductOption과의 일대다 관계 설정
  options: ProductOption[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  provider: User;

  @OneToMany(() => Review, (review) => review.product, { eager: true })
  reviews: Review[];

  @OneToMany(() => Like, (like) => like.product, { eager: true })
  likes: Like[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product, { eager: true })
  cartItems: CartItem[];
}
