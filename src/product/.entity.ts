import { IsInt, Max, Min } from 'class-validator';
import { Size } from 'src/enum/size';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  IsNull,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CreateProductDto } from './.dto';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column()
  name: string;

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

  @DeleteDateColumn()
  deleted_at: Date;
}
