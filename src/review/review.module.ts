import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/review.entity';
import { ProductEntity } from '../product/entity/product.entity';
import { ReviewWriteRepository } from './review-write.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ReviewEntity])],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewWriteRepository],
})
export class ReviewModule {}
