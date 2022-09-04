import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly id: string;

  @IsString()
  pw: string;

  @IsString()
  readonly name: string;
}
