import { ColumnNumericTransformer } from '@src/database/util/transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';

export enum CommodityStatus {
    READY = 'READY',
    EXPIRE = 'EXPIRE',
}

@Entity({ name: 'commodity' })
export class Commodity {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    id?: number;

    @Column({ type: 'varchar', name: 'title' })
    title: string;

    @Column({ type: 'varchar', name: 'description' })
    description: string;

    @Column({ type: 'varchar', name: 'company' })
    company: string;

    @Column({ type: 'varchar', name: 'size' })
    size: string;

    @Column({ type: 'varchar', name: 'color' })
    color: string;

    @Column({
        type: 'decimal',
        precision: 11,
        scale: 2,
        name: 'price',
        transformer: new ColumnNumericTransformer(),
    })
    price: number;

    @Column({ type: 'varchar', name: 'status' })
    status: CommodityStatus;

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

    @OneToMany(() => Post, (post) => post.commodity)
    @JoinColumn({ name: 'id', referencedColumnName: 'commodityId' })
    posts?: Post[];
}
