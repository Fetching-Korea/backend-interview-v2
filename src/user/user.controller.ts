import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: UserSignUpDto) {
    await this.userService.signUp(signUpDto);
    return true;
  }

  // @Post('login')
  // login(@Body() loginDto: UserLoginDto) {
  //
  // }
}
