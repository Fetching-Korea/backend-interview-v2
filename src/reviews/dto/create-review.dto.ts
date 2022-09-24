import { IsNotEmpty } from "class-validator";
export class CreateReviewDto {
    @IsNotEmpty()
    rating: number;
    @IsNotEmpty()
    comment: string;
}
