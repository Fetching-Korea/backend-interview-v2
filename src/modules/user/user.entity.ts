import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ReviewEntity } from '../review/review.entity';

@Entity({
  name: 'user',
  orderBy: {
    createdAt: 'ASC',
  },
})
@Index('IDX_USER_EMAIL', ['email'], { unique: true })
export class UserEntity {
  @ApiProperty({ description: 'id of user' })
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @ApiProperty({ description: 'name of user' })
  @Column({
    type: 'varchar',
    length: 32,
    name: 'name',
    nullable: false,
  })
  name: string;

  @ApiProperty({ description: 'email of user' })
  @Column({
    type: 'varchar',
    length: 128,
    name: 'email',
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    description: 'boolean value that indicates whether user is admin or not',
  })
  @Column({
    type: 'boolean',
    name: 'is_admin',
    nullable: false,
  })
  isAdmin: boolean;

  // @ApiProperty({ description: 'digested password of user' })
  @Exclude()
  @Column({
    type: 'char',
    length: 255,
    name: 'password',
    nullable: false,
  })
  password: string;

  // @ApiProperty({ description: 'salt of user' })
  @Exclude()
  @Column({
    type: 'char',
    length: 255,
    name: 'salt',
    nullable: false,
  })
  salt: string;

  @ApiProperty({ description: 'created timestamp of user' })
  @Column({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({ description: 'updated timestamp of user' })
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    nullable: false,
  })
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    if (partial) {
      Object.assign(this, partial);
      this.createdAt = this.createdAt || new Date();
      this.updatedAt = new Date();
    }
  }
}
