import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { UserActivity } from './user-activity.entity';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    id?: number;

    @Column({ type: 'varchar', unique: true, name: 'email' })
    email: string;

    @Column({ type: 'varchar', name: 'password' })
    password: string;

    @OneToMany(() => UserActivity, (userActivity) => userActivity.user)
    @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
    userActivities?: UserActivity[];

    @OneToMany(() => Post, (post) => post.user)
    @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
    posts?: Post[];
}
