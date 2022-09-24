import { IsNotEmpty } from "class-validator";

export class AuthLoginDto {
    @IsNotEmpty()
    customId: string;

    @IsNotEmpty()
    password: string;
}
