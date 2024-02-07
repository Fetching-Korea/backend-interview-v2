import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../common/base.entity';

@Entity('user')
export class UserEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ unique: true, length: 20 })
  @Index()
  uId: string;

  @Column({ length: 64 })
  password: string;

  @Column({ unique: true })
  email: string;
}
