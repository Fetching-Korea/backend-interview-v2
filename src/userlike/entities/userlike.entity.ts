import { Column, Entity } from 'typeorm';

@Entity()
export class UserLike {
  @Column()
  user_id: string;

  @Column()
  goods_id: string;
}
