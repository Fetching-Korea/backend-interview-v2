import { Review } from 'src/review/entities/review.entity'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm'

export enum Size {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL"
}

export enum Color {
  BLACK = "BLACK",
  WHITE = "WHITE",
  GRAY = "GRAY"
}

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string // 상품 이름

  @Column()
  desc!: string // 상품 설명

  @Column()
  brand!: string // 상품 브랜드

  @Column()
  price!: number // 상품 가격

  @Column({
    type: 'enum',
    enum: Size
  })
  size!: Size // 상품 사이즈 (XL, L, M)

  @Column({
    type: 'enum',
    enum: Color,
  })
  color!: Color // 상품 색상

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];  
}
