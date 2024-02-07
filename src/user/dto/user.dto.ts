import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserIdPassword {
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(/^[a-z]+[a-z0-9]{5,19}$/g) // 영문자 혹은 숫자 6~20
  uId: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,64}$/) // 영문 숫자 특수문자 8~64글자
  password: string;
}

export class UserSignUpDto extends UserIdPassword {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
}

export class UserLoginDto extends UserIdPassword {}
