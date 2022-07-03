import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateReqDto {
  @ApiProperty({
    example: 'nulLeeKH',
    description: 'name',
  })
  @Length(5, 20)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'i_am@nulleekh.com',
    description: 'email',
  })
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
