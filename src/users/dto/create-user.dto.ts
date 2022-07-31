import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(6)
  @MaxLength(13)
  readonly userName: string;

  @IsString()
  @MinLength(6)
  @MaxLength(15)
  readonly password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  readonly displayName: string;
}
