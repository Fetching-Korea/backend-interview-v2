import { CartItem } from 'src/cart-item/cart-item.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;
}
