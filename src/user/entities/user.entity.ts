import { Exclude } from 'class-transformer'
import { Review } from 'src/review/entities/review.entity'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm'

/**
 * 유저 테이블
 */
@Entity()
export class User extends BaseEntity {  
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    default: false
  })
  @Exclude()
  admin: boolean

  @Column({
    type: 'varchar',
    length: 15
  })
  username!: string // id

  @Column({
    type: 'varchar'
  })
  @Exclude()
  password!: string // 비밀번호

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
