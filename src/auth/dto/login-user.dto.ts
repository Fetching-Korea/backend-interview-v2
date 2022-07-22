import { IsString } from "class-validator";

export class LoginUserDto {
	@IsString()
	readonly id: string;
	@IsString()
	readonly password: string;
}