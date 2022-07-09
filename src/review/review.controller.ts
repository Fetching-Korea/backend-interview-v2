import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ReviewDto } from './dto/createReview.dto';
import { ListReviewDto } from './dto/listReview.dto';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /** 리뷰 작성 */
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/create/:productId')
  async createReview(
    @Body() input: ReviewDto,
    @Request() { user }: any,
    @Param('productId') productId: number,
  ): Promise<Review> {
    return await this.reviewService.createReview(input, user, productId);
  }

  /** 리뷰 삭제 */
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:reviewId')
  async deleteReview(
    @Param('reviewId') reviewId: number,
    @Request() { user }: any,
  ): Promise<Boolean> {
    return await this.reviewService.deleteReview(reviewId, user);
  }

  /** 리뷰 수정 */
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/update/:reviewId')
  async updateReview(
    @Param('reviewId') reviewId: number,
    @Request() { user }: any,
    @Body() input: ReviewDto,
  ): Promise<Review> {
    return await this.reviewService.updateReview(input, reviewId, user);
  }

  /** 리뷰 리스트
   * 해당 user가 적은 해당 product의 리뷰를 가져옴 (둘 다 null -> 전체 리뷰 리턴)
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/list')
  async listReview(@Body() input: ListReviewDto): Promise<Review[]> {
    return await this.reviewService.listReview(input);
  }

  /** 리뷰 상세 */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('detail/:reviewId')
  async getReviewDetail(@Param('reviewId') reviewId: number): Promise<Review> {
    return await this.reviewService.getReviewDetail(reviewId);
  }
}
