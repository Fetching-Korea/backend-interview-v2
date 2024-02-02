import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

type Size = string | number;

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 0 })
  view_count: number;

  @Column()
  total_store: number;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  category: string;

  @Column({ type: 'json', nullable: true }) // 옵션 정보를 JSON 형태로 저장
  options: { size: Size; color: string; store: number }[]; // JSON 형태의 옵션 배열
}
