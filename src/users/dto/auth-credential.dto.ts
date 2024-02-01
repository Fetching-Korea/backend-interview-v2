import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserGender } from '../user-gender.enum';
import { UserRole } from '../user-role.enum';

export class AuthCredentialsDto {
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '닉네임은 영어 대소문자와 숫자만으로 이루어져야합니다.',
  })
  nickname: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영어 대소문자와 숫자만으로 이루어져야합니다.',
  })
  password: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsString()
  @IsIn([UserGender.WOMAN, UserGender.MAN])
  gender: UserGender;

  @IsOptional()
  @IsString()
  @IsIn([UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER])
  role: UserRole;
}
