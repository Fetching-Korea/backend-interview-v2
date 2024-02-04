import { Controller, Post, UseGuards } from '@nestjs/common';
import { CartItemService } from './cart-item.service';

@Controller('/api/cart-item')
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}
}
