import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from 'src/items/item.repository';
import { User } from 'src/users/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository
  ) {}
  async createReview(createReviewDto: CreateReviewDto, user : User, itemId : number) : Promise<Review> {
    const Item = await this.itemRepository.findOne({where: {id: itemId}});
    return this.reviewRepository.createReview(createReviewDto, user, Item);
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
