import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from '../company/company.entity';
import { Post } from '../post/post.entity';
import { Commodity } from './commodity.entity';

export enum GoodsType {
    JACKET = 'JACKET',
    SHIRTS = 'SHIRTS',
    PANTS = 'PANTS',
    HAT = 'HAT',
}

@Entity({ name: 'goods' })
export class Goods {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    id?: number;

    @Column({ type: 'varchar', name: 'title' })
    title: string;

    @Column({ type: 'varchar', name: 'description' })
    description: string;

    @Column({ type: 'varchar', name: 'type' })
    type: GoodsType;

    @Column({ type: 'int', name: 'company_id' })
    companyId: number;

    @Column({ type: 'varchar', name: 'company_title' })
    companyTitle: string;

    @CreateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP(6)',
        name: 'created_at',
    })
    createdAt?: Date;

    @UpdateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
        name: 'updated_at',
    })
    updatedAt?: Date;

    @ManyToOne(() => Company, (company) => company.goodsList)
    @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
    company?: Company;

    @OneToMany(() => Commodity, (commodity) => commodity.goods)
    @JoinColumn({ name: 'id', referencedColumnName: 'goodsId' })
    commodities?: Commodity[];

    @OneToMany(() => Post, (post) => post.goods)
    @JoinColumn({ name: 'id', referencedColumnName: 'goodsId' })
    posts?: Post[];
}
