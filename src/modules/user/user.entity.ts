import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'user',
  orderBy: {
    createdAt: 'ASC',
  },
})
@Index(['email'], { unique: true })
export class UserEntity {
  @ApiProperty({ description: 'The _id of the User' })
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @ApiProperty({ description: 'The name of the User' })
  @Column({
    type: 'varchar',
    length: 32,
    name: 'name',
    nullable: false,
  })
  name: string;

  @ApiProperty({ description: 'The email of the User' })
  @Column({
    type: 'varchar',
    length: 128,
    name: 'email',
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    description:
      'boolean value that indicates whether the user is admin or not',
  })
  @Column({
    type: 'boolean',
    name: 'is_admin',
    nullable: false,
  })
  isAdmin: boolean;

  // @ApiProperty({ description: 'digested password of the user' })
  @Exclude()
  @Column({
    type: 'char',
    length: 255,
    name: 'password',
    nullable: false,
  })
  password: string;

  // @ApiProperty({ description: 'salt of the user' })
  @Exclude()
  @Column({
    type: 'char',
    length: 255,
    name: 'salt',
    nullable: false,
  })
  salt: string;

  @ApiProperty({ description: 'created timestamp of the user' })
  @Column({
    type: 'date',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({ description: 'updated timestamp of the user' })
  @Column({
    type: 'date',
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
