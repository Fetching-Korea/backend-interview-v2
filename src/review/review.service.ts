import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.entity';
import { User } from 'src/users/user.entity';
import { ReviewRepository } from './review.repository';
import { ProductService } from 'src/product/product.service'; // ProductService 추가

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private productService: ProductService, // ProductService 주입
  ) {}

  async createReview(
    productId: number,
    createReviewDto: CreateReviewDto,
    user: User,
  ): Promise<{ message: string; review: Review }> {
    // 해당 상품이 존재하는지 확인
    const product = await this.productService.getProductById(productId);
    if (!product) {
      throw new BadRequestException('존재하지 않는 상품입니다.');
    }
    console.log(product);
    // 해당 상품을 등록한 유저인지 확인
    if (product.provider.id === user.id) {
      throw new BadRequestException(
        '상품을 등록한 사용자는 리뷰를 작성할 수 없습니다.',
      );
    }
    const existingReview = await this.reviewRepository.exists({
      where: { product: { id: product.id }, user: { id: user.id } },
    });
    if (existingReview) {
      throw new ConflictException('해당상품에 대해 작성한 리뷰가 존재합니다.');
    }

    const newReview = this.reviewRepository.create({
      ...createReviewDto,
      user: { nickname: user.nickname, id: user.id },
      product: { id: product.id },
    });

    const result = await this.reviewRepository.save(newReview);
    return { message: '리뷰가 성공적으로 등록되었습니다!', review: result };
  }
}
