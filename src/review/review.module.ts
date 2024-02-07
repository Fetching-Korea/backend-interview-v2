import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from '../review/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  controllers: [],
  providers: [],
})
export class ReviewModule {}
