import { CartItem } from 'src/cart-item/cart-item.entity';
import { User } from 'src/users/user.entity';
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { eager: true })
  cartItems: CartItem[];

  @OneToOne(() => User, (user) => user.cart)
  user: User;
}
