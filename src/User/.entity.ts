import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../Comment/.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];
}
