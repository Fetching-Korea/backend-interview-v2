import { IsInt, Max, Min } from 'class-validator';
import { Size } from 'src/enum/size';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  IsNull,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Comment } from 'src/Comment/.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @IsInt()
  @Column()
  price: number;

  @Column()
  size: Size;

  @Column()
  color: string;

  @Min(0)
  @Max(100)
  @Column({ default: 0 })
  discount: number;

  @OneToMany(() => Comment, (comment) => comment.product, {
    cascade: true,
  })
  comments: Comment[];

  @DeleteDateColumn()
  deleted_at: Date;
}
