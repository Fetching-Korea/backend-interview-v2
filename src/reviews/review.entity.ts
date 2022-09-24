import { Item } from "src/items/items.entity";
import { User } from "src/users/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Item)
    @JoinColumn()
    item: Item;

    @Column()
    rating: number;

    @Column()
    comment: string;

}
