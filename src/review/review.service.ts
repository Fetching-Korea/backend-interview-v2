import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.entity';
import { User } from 'src/users/user.entity';
import { ReviewRepository } from './review.repository';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ProductRepository } from '../product/product.repository';
@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private productRepository: ProductRepository,
  ) {}

  async createReview(
    productId: number,
    createReviewDto: CreateReviewDto,
    user: User,
  ): Promise<{ message: string; review: Review }> {
    // 해당 상품이 존재하는지 확인
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (product === undefined) {
      throw new BadRequestException('존재하지 않는 상품입니다.');
    }
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

  async getReviewsByProduct(productId: number): Promise<
    {
      id: number;
      title: string;
      content: string;
      satisfaction_level: number;
      user: { nickname: string };
    }[]
  > {
    const reviews = await this.reviewRepository.find({
      where: {
        product: { id: productId },
      },
      relations: ['user'],
    });

    // User 엔티티에서 nickname만 추출하여 새로운 객체로 매핑합니다.
    const reviewsWithNicknameOnly = reviews.map((review) => ({
      ...review,
      user: { nickname: review.user.nickname },
    }));

    console.log(reviewsWithNicknameOnly);
    return reviewsWithNicknameOnly;
  }

  async updateReview(
    id: number,
    user: User,
    updateReviewDto: UpdateReviewDto,
  ): Promise<{
    message: string;
    review: {
      id: number;
      title: string;
      content: string;
      satisfaction_level: number;
      user: { nickname: string };
    };
  }> {
    const found = await this.reviewRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException('존재하지 않는 리뷰입니다.');
    }
    if (found.user.id !== user.id) {
      throw new UnauthorizedException('리뷰 수정 권한이 없습니다!');
    }
    const { title, content, satisfaction_level } = updateReviewDto;
    if (title !== undefined) {
      found.title = title;
    }
    if (content !== undefined) {
      found.content = content;
    }
    if (satisfaction_level !== undefined) {
      found.satisfaction_level = satisfaction_level;
    }

    const updatedReview = await this.reviewRepository.save(found);

    // 사용자의 닉네임만 가져와서 새로운 객체로 매핑합니다.
    const reviewWithNicknameOnly = {
      id: updatedReview.id,
      title: updatedReview.title,
      content: updatedReview.content,
      satisfaction_level: updatedReview.satisfaction_level,
      user: { nickname: updatedReview.user.nickname },
    };

    return {
      message: '리뷰가 성공적으로 수정되었습니다.',
      review: reviewWithNicknameOnly,
    };
  }

  async deleteReview(id: number, user: User): Promise<{ message: string }> {
    const found = await this.reviewRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (!found) {
      throw new BadRequestException('존재하지 않는 리뷰입니다.');
    }

    if (found.user.id !== user.id && user.role !== 'ADMIN') {
      throw new UnauthorizedException('리뷰 삭제 권한이 없습니다.');
    }

    const result = await this.reviewRepository.delete({
      id,
    });

    if (result.affected === 1) {
      return { message: '리뷰가 성공적으로 삭제되었습니다.' };
    } else {
      throw new InternalServerErrorException(
        '리뷰 삭제 중 오류가 발생하였습니다.',
      );
    }
  }
}
