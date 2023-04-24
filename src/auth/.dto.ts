import { IsBase64, IsEmail } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsBase64()
  password: string;
}
