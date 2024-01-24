import { Size } from "../entities/product.entity";

export class CreateProductDto {
    name: string;

    descript: string;

    brand: string;

    price: number;

    size: Size;

    color: string;
}