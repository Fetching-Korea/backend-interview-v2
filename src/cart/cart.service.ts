import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { User } from 'src/users/user.entity';
@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async createCart(user: User) {
    const newCart = this.cartRepository.create({ user: { id: user.id } });
    await this.cartRepository.save(newCart);
  }
}
