import { IsNotEmpty, IsNumber } from "class-validator";

export class ProductIdDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}