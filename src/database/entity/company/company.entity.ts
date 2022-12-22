import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Goods } from '../goods/goods.entity';

@Entity({ name: 'company' })
export class Company {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    id?: number;

    @Column({ type: 'varchar', name: 'title' })
    title: string;

    @OneToMany(() => Goods, (goods) => goods.company)
    @JoinColumn({ name: 'id', referencedColumnName: 'companyId' })
    goodsList?: Goods[];
}
