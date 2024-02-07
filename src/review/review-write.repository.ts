import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ReviewEntity } from './entity/review.entity';
import { ProductEntity } from '../product/entity/product.entity';

@Injectable()
export class ReviewWriteRepository {
  constructor(private dataSource: DataSource) {}

  async saveAndUpdateCount(review: ReviewEntity, product: ProductEntity) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(review);

      const reviewCount = await queryRunner.manager.count<ReviewEntity>(
        ReviewEntity,
        {
          where: { productId: review.productId },
        },
      );
      product.reviewCount = reviewCount;
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }

  async removeAndUpdateCount(review: ReviewEntity, product: ProductEntity) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(ReviewEntity, review.id);

      const reviewCount = await queryRunner.manager.count<ReviewEntity>(
        ReviewEntity,
        {
          where: { productId: review.productId },
        },
      );
      product.reviewCount = reviewCount;
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }
}
