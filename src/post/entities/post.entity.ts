import { Product } from "src/product/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'post'})
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.posts, { lazy: true })
    @JoinColumn({name: "userId"})
    user: User;

    @ManyToOne(() => Product, product => product.posts, { lazy: true })
    @JoinColumn({name: "productId"})
    product: Product;

    @Column()
    review: string;

    @Column()
    likes: number;

    async addLike() {
        this.likes++;
    };
}
