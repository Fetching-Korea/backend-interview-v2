import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;
}
