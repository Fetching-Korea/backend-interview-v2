import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto, UserSignUpDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: UserSignUpDto) {
    await this.userService.signUp(signUpDto);
    return true;
  }

  @Post('login')
  async login(@Body() loginDto: UserLoginDto) {
    const userPayload = await this.userService.login(loginDto);
    return userPayload;
  }
}
