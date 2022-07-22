import { IsString } from "class-validator";

export class SignupUserDto {
	@IsString()
	readonly id: string;
	@IsString()
	readonly password: string;
	@IsString()
	readonly userName: string;
}