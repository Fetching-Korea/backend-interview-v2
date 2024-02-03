import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/users/user.entity';
import { Review } from './review.entity';
import { AuthGuard } from '@nestjs/passport';
import { Product } from 'src/product/product.entity';
import { GetUser } from 'src/users/get-user.decorator';

@Controller('api/review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async createReview(
    @Query('productId') productId: Product['id'],
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ): Promise<{ message: string; review: Review }> {
    return this.reviewService.createReview(productId, createReviewDto, user);
  }

  @Get()
  getReviewsByProduct(@Query('productId') productId: number): Promise<
    {
      id: number;
      title: string;
      content: string;
      satisfaction_level: number;
      user: { nickname: string };
    }[]
  > {
    {
      return this.reviewService.getReviewsByProduct(productId);
    }
  }
}
