import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'User2' })
@Unique(['userIdx'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  userIdx: number;

  @Column({ type: 'varchar', length: 45, comment: '유저 아이디' })
  id: string;

  @Column({ type: 'varchar', length: 180, comment: '유저 비밀번호' })
  pw: string;

  @Column({ type: 'varchar', length: 45, comment: '유저 이름' })
  name: string;

  @Column({
    type: 'varchar',
    comment: 'ACTIVE: 활성화 INACTIVE: 비활성화 DELETED: 삭제됨',
    default: 'ACTIVE',
  })
  status: string;

  @CreateDateColumn({ name: 'createdAt', comment: '생성 날짜' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', comment: '수정 날짜' })
  updatedAt: Date;
}
