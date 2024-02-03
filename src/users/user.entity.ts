import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserGender } from './user-gender.enum';
import { UserRole } from './user-role.enum';
import { Product } from 'src/product/product.entity';
import { Review } from 'src/review/review.entity';

@Entity()
@Unique(['email', 'nickname'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nickname: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: false })
  gender: UserGender;

  @Column({ nullable: false, default: 'CUSTOMER' })
  role: UserRole;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Product, (product) => product.provider, {
    nullable: true,
  })
  products: Product[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
