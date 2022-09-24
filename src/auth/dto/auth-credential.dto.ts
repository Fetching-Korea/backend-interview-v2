import { IsNotEmpty } from "class-validator";

export class AuthCredentialDto {
    @IsNotEmpty()
    customId: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}
