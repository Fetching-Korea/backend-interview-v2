import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { ItemStatus } from "./itemsStatus.enum";

@Entity()
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    brand: string;

    @Column()
    price: number;

    @Column()
    size: string;

    @Column()
    color: string;

    @Column()
    status: ItemStatus;

}