import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
