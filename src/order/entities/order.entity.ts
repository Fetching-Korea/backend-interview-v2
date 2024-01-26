import { Product } from "src/product/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Status {
    O = 'Order',
    C = 'Cancel',
}

@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.orders, { lazy: true })
    @JoinColumn({name: "userId"})
    user: User;

    @ManyToOne(() => Product, product => product.orders, { lazy: true })
    @JoinColumn({name: "productId"})
    product: Product;

    @CreateDateColumn()
    orderedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.O, // 기본값 설정
    })
    status: Status;

    constructor(user: User, product: Product, status: Status = Status.O) {
        this.user = user;
        this.product = product;
        this.status = status;
    }

}
