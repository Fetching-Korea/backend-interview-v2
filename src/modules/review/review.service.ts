import { Injectable } from '@nestjs/common';
import { ReviewUpdateReqDto } from './dto/review-update-req.dto';
import { typeormService } from '../../utils';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  async insert(
    reviewUpdateReqDto: ReviewUpdateReqDto,
    userId: number,
  ): Promise<ReviewEntity> {
    return await typeormService.source.getRepository(ReviewEntity).save(
      new ReviewEntity({
        ...reviewUpdateReqDto,
        user: userId,
      }),
    );
  }
}
