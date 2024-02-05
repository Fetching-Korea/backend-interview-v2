import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { User } from 'src/users/user.entity';
@Injectable()
export class MypageService {
  constructor(private userRepository: UserRepository) {}

  async getMyReviews(user: User) {
    const userInfo = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['reviews', 'reviews.product'],
    });
    if (userInfo.reviews.length === 0) {
      return { message: '아직 리뷰가 없습니다!' };
    }
    const simplifiedReviews = userInfo.reviews.map((review) => ({
      id: review.id,
      title: review.title,
      content: review.content,
      satisfaction_level: review.satisfaction_level,
      created_at: review.created_at,
      updated_at: review.updated_at,
      product: {
        id: review.product.id,
        name: review.product.name,
        description: review.product.description,
        price: review.product.price,
        brand: review.product.brand,
        category: review.product.category,
      },
    }));
    return simplifiedReviews;
  }

  async getMyLikes(user: User) {
    const userInfo = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['likes', 'likes.product'],
    });
    if (userInfo.likes.length === 0) {
      return { message: '찜한 상품이 없습니다' };
    }
    const result = userInfo.likes.map((like) => ({
      id: like.id,
      product: {
        id: like.product.id,
        name: like.product.name,
        description: like.product.description,
        view_count: like.product.view_count,
        total_store: like.product.total_store,
        brand: like.product.brand,
        category: like.product.category,
      },
    }));
    return result;
  }

  async getMyCart(user: User) {
    const userInfo = await this.userRepository.findOne({
      where: { id: user.id },
      relations: [
        'cart',
        'cart.cartItems',
        'cart.cartItems.productOption',
        'cart.cartItems.product',
      ],
    });
    if (userInfo.cart.cartItems.length === 0) {
      return { message: '장바구니에 담긴 상품이 없습니다' };
    }
    const result = userInfo.cart.cartItems.map((items) => ({
      id: items.id,
      quantity: items.quantity,
      productOption: items.productOption,
      product: {
        id: items.product.id,
        name: items.product.name,
        brand: items.product.brand,
        price: items.product.price,
      },
    }));
    return result;
  }
}
