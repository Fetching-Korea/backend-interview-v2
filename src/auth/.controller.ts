import { Controller, HttpCode, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './.service';
import { SignInDto } from './.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
