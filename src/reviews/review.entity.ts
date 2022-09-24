import { Item } from "src/items/items.entity";
import { User } from "src/users/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToOne(() => Item)
    @JoinColumn()
    item: Item;

    @Column()
    rating: number;

    @Column()
    comment: string;

}
