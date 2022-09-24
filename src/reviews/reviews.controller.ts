import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Review } from './review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/:itemId')
  @UseGuards(AuthGuard())
  createReivew(
    @Body(ValidationPipe) createReviewDto: CreateReviewDto,
    @GetUser() user,
    @Param('itemId') itemId: number
    ) : Promise<{statusCode:string, contents:Review}> {
    return this.reviewsService.createReview(createReviewDto, user, itemId);
  }

  @Get('/:id')
  getReviewById(@Param('id') id: number) : Promise<{statusCode:string, contents:Review}> {
    return this.reviewsService.getReviewById(id);
  }

  @Get('/item/:itemId')
  getReviewsByItemId(@Param('itemId') itemId: number) : Promise<{statusCode:string, contents:Review[]}> {
    return this.reviewsService.getReviewByItemId(itemId);
  }

  @Get('/item/:itemId/avarage')
  getAvarageRatingByItemId(@Param('itemId') itemId: number) : Promise<{statusCode:string, contents:number}> {
    return this.reviewsService.getAvaregeRatingByItemId(itemId);
  }

  @Get('/user/:userId')
  getReviewsByUserId(@Param('userId') userId: number) : Promise<{statusCode:string, contents:Review[]}> {
    return this.reviewsService.getReviewByUserId(userId);
  }

  @Get('/item/:itemId/user/:userId')
  getReviewByItemIdAndUserId(
    @Param('itemId') itemId: number, 
    @Param('userId') userId: number
    ) : Promise<{statusCode:string, contents:Review}> {
    return this.reviewsService.getReviewByItemIdAndUserId(itemId, userId);
  }
}
