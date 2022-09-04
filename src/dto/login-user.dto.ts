import { IsString } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  readonly id: string;

  @IsString()
  pw: string;
}
