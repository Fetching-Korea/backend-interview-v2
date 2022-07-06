import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm'

/**
 * 유저 테이블
 */
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: 'varchar',
    length: 15
  })
  username!: string // id

  @Column({
    type: 'varchar'
  })
  password!: string // 비밀번호
}
