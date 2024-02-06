import { BaseTimeEntity } from '../../common/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('size')
export class SizeEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // S M L XL 등

  @Column()
  description: string; // ex {"총장": 72}
}
