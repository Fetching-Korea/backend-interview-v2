import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'review',
  orderBy: {
    createdAt: 'ASC',
  },
})
@Index('IDX_REVIEW_USERID', ['user'], { unique: false })
@Index('IDX_REVIEW_PRODUCTID', ['product'], { unique: false })
export class ReviewEntity {
  @ApiProperty({ description: 'id of review' })
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @ApiProperty({
    description: 'information of product',
    example: ProductEntity,
  })
  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn({
    name: 'product',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_REVIEW_PRODUCT',
  })
  product: ProductEntity;

  @ApiProperty({ description: 'information of user', example: UserEntity })
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({
    name: 'user',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_REVIEW_USER',
  })
  user: UserEntity;

  @ApiProperty({ description: 'score of review' })
  @Column({
    type: 'int',
    name: 'score',
    nullable: false,
  })
  score: number;

  @ApiProperty({ description: 'content of review' })
  @Column({
    type: 'text',
    name: 'content',
    nullable: false,
  })
  content: string;

  @ApiProperty({ description: 'created timestamp of product' })
  @Column({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({ description: 'updated timestamp of product' })
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    nullable: false,
  })
  updatedAt: Date;

  constructor(partial: Partial<ReviewEntity>) {
    if (partial) {
      Object.assign(this, partial);
      this.createdAt = this.createdAt || new Date();
      this.updatedAt = new Date();
    }
  }
}
