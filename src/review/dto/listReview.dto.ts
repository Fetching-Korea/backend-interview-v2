import { IsNumber, ValidateIf } from "class-validator";

export class ListReviewDto {
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    readonly userId: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    readonly productId: number | null;
}