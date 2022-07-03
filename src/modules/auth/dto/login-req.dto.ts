import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginReqDto {
  @ApiProperty({
    example: 'i_am@nulleekh.com',
    description: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: '123',
    description: 'password',
  })
  @IsNotEmpty()
  readonly password: string;
}
