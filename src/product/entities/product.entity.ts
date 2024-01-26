import { Order } from "src/order/entities/order.entity";
import { Post } from "src/post/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Size {
    M = 'M',
    L = 'L',
    XL = 'XL',
    FREE = 'FREE',
}

@Entity({name: 'product'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    descript: string;

    @Column()
    brand: string;

    @Column()
    price: number;

    @Column({
        type: 'enum',
        enum: Size,
        default: Size.FREE, // 기본값 설정
    })
    size: Size;

    @Column()
    color: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Order, order => order.product, { cascade: true , lazy: true})
    orders: Order[];

    @OneToMany(() => Post, post => post.user, { cascade: true , lazy: true})
    posts: Post[];


}
