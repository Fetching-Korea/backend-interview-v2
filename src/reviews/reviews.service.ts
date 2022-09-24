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
  async createReview(createReviewDto: CreateReviewDto, user : User, itemId : number) : Promise<{statusCode:string, contents:Review}> {
    const Item = await this.itemRepository.findOne({where: {id: itemId}});
    return this.reviewRepository.createReview(createReviewDto, user, Item);
  }

  async getReviewById(id: number) : Promise<{statusCode:string, contents:Review}> {
    const found = await this.reviewRepository.findOne({where: {id}});
    if(!found) {
      return {statusCode:"404", contents:null};
    }
    return {statusCode:"200", contents:found};
  }

  async getReviewByItemId(itemId: number) : Promise<{statusCode:string, contents:Review[]}> {
    const found = await this.reviewRepository.find({where: {item: itemId}});
    if(!found) {
      return {statusCode:"404", contents:null};
    }
    return {statusCode:"200", contents:found};
  }

  async getAvaregeRatingByItemId(itemId: number) : Promise<{statusCode:string, contents:number}> {
    const found = await this.reviewRepository.find({where: {item: itemId}});
    if(!found) {
      return {statusCode:"404", contents:null};
    }
    let sum = 0;
    for(let i = 0; i < found.length; i++) {
      sum += found[i].rating;
    }
    return {statusCode:"200", contents:sum/found.length};
  }

  async getReviewByUserId(userId: number) : Promise<{statusCode:string, contents:Review[]}> {
    const found = await this.reviewRepository.find({where: {userId}});
    if(!found) {
      return {statusCode:"404", contents:null};
    }
    return {statusCode:"200", contents:found};
  }

  async getReviewAll() : Promise<{statusCode:string, contents:Review[]}> {
    const found = await this.reviewRepository.find();
    if(!found) {
      return {statusCode:"404", contents:null};
    }
    return {statusCode:"200", contents:found};
  }

  async getReviewByItemIdAndUserId(userId: number, itemId: number) : Promise<{statusCode:string, contents:Review}> {
    const found = await this.reviewRepository.findOne({where: {userId, itemId}});
    if(!found) {
      return {statusCode:"404", contents:null};
    }
    return {statusCode:"200", contents:found};
  }

}
