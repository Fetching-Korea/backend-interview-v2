import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Good {
  @PrimaryColumn()
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 300 })
  description: string;

  @Column({ length: 30 })
  brand: string;

  @Column()
  price: number;

  @Column()
  size: number;

  @Column({ length: 10 })
  color: string;

  constructor(
    id: string,
    name: string,
    description: string,
    brand: string,
    price: number,
    size: number,
    color: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.brand = brand;
    this.price = price;
    this.size = size;
    this.color = color;
  }
}
