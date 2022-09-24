import { IsNotEmpty } from "class-validator";

export class CreateItemsDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    brand: string;
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    size: string;
    @IsNotEmpty()
    color: string;
}