import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../common/base.entity';

@Entity('user')
export class UserEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  uId: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
