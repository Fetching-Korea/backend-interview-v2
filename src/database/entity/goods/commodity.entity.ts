import { ColumnNumericTransformer } from '@src/database/util/transformer';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Goods } from './goods.entity';

export enum CommodityStatus {
    READY = 'READY',
    SOLD = 'SOLD',
    EXPIRE = 'EXPIRE',
}

@Entity({ name: 'commodity' })
export class Commodity {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    id?: number;

    @Column({ type: 'int', name: 'goods_id' })
    goodsId: number;

    @Column({ type: 'varchar', name: 'title' })
    title: string;

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

    @ManyToOne(() => Goods, (goods) => goods.commodities)
    @JoinColumn({ name: 'goods_id', referencedColumnName: 'id' })
    goods?: Goods;
}
