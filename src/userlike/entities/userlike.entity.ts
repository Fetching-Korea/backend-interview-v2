import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserLike {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  goods_id: string;
}
