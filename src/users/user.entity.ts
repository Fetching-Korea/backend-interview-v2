import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['customId'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    customId: string;

    @Column({ length: 30 })
    name: string;

    @Column({ length: 60 })
    email: string;

    @Column()
    password: string;
}