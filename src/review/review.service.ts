import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { PayloadDto } from 'src/utils/payload.dto';
import { Repository } from 'typeorm';
import { ReviewDto } from './dto/createReview.dto';
import { ListReviewDto } from './dto/listReview.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  /** 리뷰 작성 */
  async createReview(
    input: ReviewDto,
    payload: PayloadDto,
    productId: number,
  ): Promise<Review> {
    const user = await this.userService.findUserWithPayload(payload);
    if (!user) throw new UnauthorizedException();

    const product = await this.productService.findOneById(productId);
    if (!product)
      throw new BadRequestException('해당 상품이 존재하지 않습니다');

    const res = await this.reviewRepository
      .create({ ...input, user, product })
      .save();
    return res;
  }

  /** 리뷰 삭제 */
  async deleteReview(reviewId: number, payload: PayloadDto): Promise<Boolean> {
    await this.checkAuthAndReturn(reviewId, payload);

    const res = await this.reviewRepository.delete(reviewId);
    if (res.affected && res.affected == 1) return true;
    return false;
  }

  async checkAuthAndReturn(
    reviewId: number,
    payload: PayloadDto,
  ): Promise<Review> {
    const user = await this.userService.findUserWithPayload(payload);
    if (!user) throw new UnauthorizedException();

    const review = await this.findOneByReviewId(reviewId);
    if (!review) throw new BadRequestException('해당 리뷰가 존재하지 않습니다');

    if (review.userId != user.id) throw new UnauthorizedException();

    return review;
  }

  async findOneByReviewId(reviewId: number): Promise<Review> {
    return await this.reviewRepository.findOne({ where: { id: reviewId } });
  }

  /** 리뷰수정 */
  async updateReview(
    input: ReviewDto,
    reviewId: number,
    payload: PayloadDto,
  ): Promise<Review> {
    const review = await this.checkAuthAndReturn(reviewId, payload);

    review.title = input.title;
    review.desc = input.desc;

    const res = await this.reviewRepository.save(review);
    return res;
  }

  /** 리뷰리스트 */
  async listReview(input: ListReviewDto): Promise<Review[]> {
    const tm = this.reviewRepository.createQueryBuilder('review');

    if (input.userId) tm.andWhere('review.userId = :userId', { userId: input.userId });
    if (input.productId) tm.andWhere('review.productId = :productId', { productId: input.productId });

    const reviewList = await tm.getMany();

    return reviewList;
  }

  /** 리뷰상세 */
  async getReviewDetail(reviewId: number): Promise<Review> {
    const review = await this.findOneByReviewId(reviewId);
    return review;
  }
}
