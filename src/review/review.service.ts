import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entity/review.entity';
import { ProductEntity } from '../product/entity/product.entity';
import { ReviewWriteRepository } from './review-write.repository';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    private reviewWriteRepository: ReviewWriteRepository,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  private isNotSameUserId(review: ReviewEntity, loginUserId: number) {
    return review.userId !== loginUserId;
  }

  async create(createReviewDto: CreateReviewDto, loginUserId: number) {
    const { productId, userId, score, content } = createReviewDto;

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('product is not exist');
    }

    const review = new ReviewEntity();
    review.productId = productId;
    review.userId = userId;
    review.score = score;
    review.content = content;

    if (this.isNotSameUserId(review, loginUserId)) {
      throw new ForbiddenException('user different');
    }

    await this.reviewWriteRepository.saveAndUpdateCount(review, product);
    return;
  }

  async update(updateReviewDto: UpdateReviewDto, loginUserId: number) {
    const { id, score, content } = updateReviewDto;
    const review = await this.reviewRepository.findOne({
      where: {
        id,
      },
    });

    if (this.isNotSameUserId(review, loginUserId)) {
      throw new ForbiddenException('user different');
    }
    review.score = score;
    review.content = content;
    await this.reviewRepository.save(review);

    return;
  }

  async remove(id: number, loginUserId: number) {
    const review = await this.reviewRepository.findOne({
      where: {
        id,
      },
    });

    if (this.isNotSameUserId(review, loginUserId)) {
      throw new ForbiddenException('user different');
    }

    const product = await this.productRepository.findOne({
      where: { id: review.productId },
    });

    if (!product) {
      throw new NotFoundException('product is not exist');
    }

    await this.reviewWriteRepository.removeAndUpdateCount(review, product);
    return `${id} review remove`;
  }

  async findAllByProductId(productId: number, page: number, take: number) {
    const queryBuilder = this.reviewRepository.createQueryBuilder('review');
    queryBuilder.select(['review']);
    queryBuilder.innerJoinAndSelect('review.user', 'user');
    queryBuilder.where('review.product_id = :productId', { productId });
    queryBuilder.offset(take * (page - 1));
    queryBuilder.limit(take);

    const reviewList = await queryBuilder.getMany();

    const returnReviewList = reviewList.map((review) => {
      const user = {
        name: review.user.name,
      };
      return {
        ...review,
        user: user,
      };
    });
    return { reviewList: returnReviewList, currentPage: page };
  }

  async findAllByUserId(userId: number, page: number, take: number) {
    const reviewList = await this.reviewRepository.find({
      where: {
        userId,
      },
      skip: take * (page - 1),
      take: take,
      relations: {
        product: true,
      },
    });
    return { reviewList: reviewList, currentPage: page };
  }
}
