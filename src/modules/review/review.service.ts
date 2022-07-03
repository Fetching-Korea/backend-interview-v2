import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ReviewUpdateReqDto } from './dto/review-update-req.dto';
import { typeormService } from '../../utils';
import { ReviewEntity } from './review.entity';
import { UserEntity } from '../user/user.entity';
import { ProductEntity } from '../product/product.entity';

@Injectable()
export class ReviewService {
  async insert(
    reviewUpdateReqDto: ReviewUpdateReqDto,
    user: UserEntity,
  ): Promise<ReviewEntity> {
    const foundProduct = await typeormService.source
      .getRepository(ProductEntity)
      .findOne({
        where: {
          id: reviewUpdateReqDto.product,
        },
      });

    if (!foundProduct) {
      throw new NotFoundException('Product not found.');
    }

    return await typeormService.source.getRepository(ReviewEntity).save(
      new ReviewEntity({
        ...reviewUpdateReqDto,
        product: foundProduct,
        user: user,
      }),
    );
  }

  async deleteOne(id: number, doerId?: number): Promise<boolean> {
    const foundReview = await typeormService.source
      .getRepository(ReviewEntity)
      .findOne({
        where: {
          id,
        },
        loadEagerRelations: true,
      });

    if (!foundReview) {
      throw new NotFoundException('Product not found.');
    }

    if (doerId && doerId !== foundReview.user.id)
      throw new UnauthorizedException(
        'Do not have access to delete this review.',
      );

    return !!(await typeormService.source
      .getRepository(ReviewEntity)
      .delete(id));
  }
}
