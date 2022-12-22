import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Commodity } from '../goods/commodity.entity';
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

    @Column({ type: 'int', name: 'commodity_id' })
    commodityId: number;

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

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: User;

    @ManyToOne(() => Commodity, (commodity) => commodity.posts)
    @JoinColumn({ name: 'commodity_id', referencedColumnName: 'id' })
    commodity?: Commodity;
}
