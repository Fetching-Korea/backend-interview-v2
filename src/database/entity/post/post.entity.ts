import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Goods } from '../goods/goods.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'post' })
export class Post {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    id?: number;

    @Column({ type: 'varchar', name: 'title' })
    title: string;

    @Column({ type: 'varchar', name: 'body' })
    body: string;

    @Column({ type: 'int', name: 'user_id' })
    userId: number;

    @Column({ type: 'int', name: 'goods_id' })
    goodsId: number;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: User;

    @ManyToOne(() => Goods, (goods) => goods.posts)
    @JoinColumn({ name: 'goods_id', referencedColumnName: 'id' })
    goods?: Goods;
}
