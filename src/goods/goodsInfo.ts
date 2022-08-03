export class GoodsInfo {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  size: number;
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
