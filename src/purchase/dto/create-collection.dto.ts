import { IsNumber } from "class-validator";

export class CreateCollectionDto {
	@IsNumber()
	readonly productId: number;
}