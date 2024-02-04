import { CustomRepository } from 'src/typeorm-setting/typeorm-ex.decorator';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';

@CustomRepository(Cart)
export class CartRepository extends Repository<Cart> {}
