import { CustomRepository } from 'src/typeorm-setting/typeorm-ex.decorator';
import { CartItem } from './cart-item.entity';
import { Repository } from 'typeorm';

@CustomRepository(CartItem)
export class CartItemRepository extends Repository<CartItem> {}
