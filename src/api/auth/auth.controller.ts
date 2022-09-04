import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from '../../dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  postLogin(@Body() userData: LoginUserDTO) {
    return this.authService.login(userData);
  }
}
