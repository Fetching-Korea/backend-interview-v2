import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'Item2' })
@Unique(['itemIdx'])
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  itemIdx: number;

  @Column({ type: 'varchar', length: 45, comment: '상품 이름' })
  name: string;

  @Column({ type: 'varchar', length: 300, comment: '상품 설명' })
  description: string;

  @Column({ type: 'varchar', length: 45, comment: '상품 브랜드명' })
  brand: string;

  @Column({ type: 'int', comment: '상품 가격' })
  price: number;

  @Column({ type: 'varchar', length: 15, comment: '상품 사이즈' })
  size: string;

  @Column({ type: 'varchar', length: 45, comment: '상품 색상' })
  color: string;

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
