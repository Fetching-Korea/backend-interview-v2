import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { GetUser } from 'src/users/get-user.decorator';
import { CartItem } from './cart-item.entity';

@Controller('/api/cart-item')
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}

  @Post()
  @UseGuards(AuthGuard())
  addCartItem(
    @Body('productId') productId: number,
    @Body('optionId') optionId: number,
    @Body('quantity') quantity: number,
    @GetUser() user: User,
  ): Promise<{ message: string; cartItem: CartItem }> {
    return this.cartItemService.createOrUpdateCartItem(
      productId,
      optionId,
      quantity,
      user,
    );
  }
  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteCartItem(@Param('id') cartItemId: number, @GetUser() user: User) {
    return this.cartItemService.deleteCartItemById(user, cartItemId);
  }
}
