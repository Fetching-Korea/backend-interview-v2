import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { Cart } from 'src/cart/cart.entity';
import { ProductOption } from 'src/product-option/product-option.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, { eager: true })
  cart: Cart;

  @ManyToOne(() => ProductOption, (productOption) => productOption.cartItems)
  productOption: ProductOption;

  @Column()
  quantity: number;
}
