import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository
  ) {}
  async createReview(createReviewDto: CreateReviewDto) : Promise<Review> {
    return this.reviewRepository.createReview(createReviewDto);
  }

  async getReviewById(id: number) : Promise<Review> {
    return this.reviewRepository.findOne({where: {id}});
  }

  // async getReviewByItemId(itemId: number) : Promise<Review[]> {
  //   return this.reviewRepository.find({where: {itemId}});
  // }

  async getReviewByUserId(userId: number) : Promise<Review[]> {
    return this.reviewRepository.find({where: {userId}});
  }

  async getReviewAll() : Promise<Review[]> {
    return this.reviewRepository.find();
  }
}
