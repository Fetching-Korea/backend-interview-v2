import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../common/base.entity';

@Entity('user')
export class UserEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 20 })
  uId: string;

  @Column({ length: 64 })
  password: string;

  @Column({ unique: true })
  email: string;
}
