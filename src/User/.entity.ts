import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Comment } from '../Comment/.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user, { nullable: true })
  comments: Comment[];
}
