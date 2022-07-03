import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class UserCreateReqDto {
  @ApiProperty({
    example: 'nulLeeKH',
    description: 'name',
  })
  @Length(1, 32)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'i_am@nulleekh.com',
    description: 'email',
  })
  @Length(1, 128)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: true,
    description:
      'boolean value that indicates whether the user is admin or not',
  })
  @IsNotEmpty()
  readonly isAdmin: boolean;

  @ApiProperty({
    example: '123',
    description: 'password',
  })
  @IsNotEmpty()
  readonly password: string;
}
