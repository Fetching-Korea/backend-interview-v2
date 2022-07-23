import { IsString, IsNumber } from "class-validator";

export class CreateProductDto {
	@IsString()
	readonly name: string;
	@IsString()
	readonly explanation: string;
	@IsString()
	readonly brand: string;
	@IsNumber()
	readonly cost: number;
	@IsString()
	readonly size: number;
	@IsString()
	readonly color: string;
}