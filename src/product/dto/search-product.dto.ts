import { Size } from "../entities/product.entity";

export class searchProducts {
    name?: string;

    descript?: string;

    brand?: string;

    max_price?: number;
    min_price?: number;

    size?: Size;

    color?: string;
}