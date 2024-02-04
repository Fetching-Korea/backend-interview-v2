import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { ProductOptionRepository } from 'src/product-option/product-option.repository';
import { CartItemRepository } from './cart-item.repository';
import { CartItem } from './cart-item.entity';

@Injectable()
export class CartItemService {
  constructor(
    private cartItemRepository: CartItemRepository,
    private productOptionRepository: ProductOptionRepository,
  ) {}

  async createOrUpdateCartItem(
    productId: number,
    optionId: number,
    quantity: number,
    user: User,
  ): Promise<{ message: string; cartItem: CartItem }> {
    console.log(productId, optionId, user);
    //해당 option이 product의 옵션이 맞는지 확인해야함
    const option = await this.productOptionRepository.findOne({
      where: { product: { id: productId }, id: optionId },
    });
    console.log(option);
    if (!option) {
      throw new BadRequestException('해당하는 상품의 옵션이 존재하지 않습니다');
    }
    const cartItem = await this.cartItemRepository.findOne({
      where: { productOption: { id: optionId }, cart: { id: user.cart.id } },
    });

    console.log(cartItem);

    if (!cartItem) {
      // 해당 아이템이 장바구니에 없는 경우
      try {
        const newCartItem = this.cartItemRepository.create({
          product: { id: productId },
          cart: { id: user.cart.id },
          productOption: { id: optionId },
          quantity,
        });

        const result = await this.cartItemRepository.save(newCartItem);
        return {
          message: '장바구니에 상품이 추가되었습니다.',
          cartItem: result,
        };
      } catch (err) {
        throw new InternalServerErrorException('장바구니 저장 중 오류 발생!');
      }
    } else {
      // 해당 아이템이 장바구니에 있는 경우
      try {
        cartItem.quantity += quantity;
        await this.cartItemRepository.save(cartItem);

        return { message: '장바구니에 수량이 업데이트 되었습니다.', cartItem };
      } catch (err) {
        throw new InternalServerErrorException(
          '장바구니 수량 업데이트 중 오류 발생!',
        );
      }
    }
  }
}
