import { Order } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Grade {
    P = 'Provider',
    C = 'Consumer',
}

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
        type: 'enum',
        enum: Grade,
        default: Grade.C, // 기본값 설정
    })
    grade: Grade;

    @Column()
    email: string;
  
    @Column()
    nickName: string;

    @Column()
    name: string;
  
    @Column()
    birthDate: string;

    @Column()
    number: string;
  
    @Column()
    password: string;
  
    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Order, order => order.user, { cascade: true })
    orders: Order[];

}
