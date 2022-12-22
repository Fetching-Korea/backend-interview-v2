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
import { UserActivity } from './user-activity.entity';

export enum UserTier {
    NORMAL = 'NORMAL',
    ADMIN = 'ADMIN',
    REMOVED = 'REMOVED',
}

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    id?: number;

    @Column({ type: 'varchar', unique: true, name: 'email' })
    email: string;

    @Column({ type: 'varchar', name: 'password' })
    password?: string;

    @Column({ type: 'varchar', name: 'tier' })
    tier: UserTier;

    @Column({ type: 'varchar', name: 'refresh_token', nullable: true })
    refreshToken?: string;

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

    @OneToMany(() => UserActivity, (userActivity) => userActivity.user)
    @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
    userActivities?: UserActivity[];

    @OneToMany(() => Post, (post) => post.user)
    @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
    posts?: Post[];
}
