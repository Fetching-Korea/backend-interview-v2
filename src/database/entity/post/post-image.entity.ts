import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('post_image')
export class PostImage {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id?: string;

    @Column({ type: 'int', name: 'post_id' })
    postId: number;

    @Column({ type: 'varchar', name: 'url' })
    url: string;

    @CreateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP(6)',
        name: 'created_at',
    })
    createdAt?: Date;

    @ManyToOne(() => Post, (post) => post.images)
    @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
    post?: Post;
}
