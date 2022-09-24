import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/:itemId')
  @UseGuards(AuthGuard())
  createReivew(
    @Body(ValidationPipe) createReviewDto: CreateReviewDto,
    @GetUser() user,
    @Param('itemId') itemId: number
    ) {
    return this.reviewsService.createReview(createReviewDto, user, itemId);
  }

  @Get('/:itemId')
  getReviews(@Param('itemId') itemId: number) {
    return this.reviewsService.getReviewById(itemId);
  }
}
