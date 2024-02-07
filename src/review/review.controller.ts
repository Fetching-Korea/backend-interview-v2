import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RequestUserType, User } from '../user/user.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/product/:productId')
  findAllByProductId(
    @Param('productId') productId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('take', new DefaultValuePipe(30), ParseIntPipe) take: number,
  ) {
    return this.reviewService.findAllByProductId(productId, page, take);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  findAllByUserId(
    @User() user: RequestUserType,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('take', new DefaultValuePipe(30), ParseIntPipe) take: number,
  ) {
    return this.reviewService.findAllByUserId(user.id, page, take);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(
    @User() user: RequestUserType,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.create(createReviewDto, user.id);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @User() user: RequestUserType,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    await this.reviewService.update(updateReviewDto, user.id);
    return true;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @User() user: RequestUserType,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.reviewService.remove(id, user.id);
    return true;
  }
}
