import { Product } from 'src/Product/.entity';
import { User } from 'src/User/.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  comment: string;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => User)
  user: User;
}
