import { IsNotEmpty } from "class-validator";
export class CreateReviewDto {
    @IsNotEmpty()
    itemId: number;
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    rating: number;
    @IsNotEmpty()
    comment: string;
}
