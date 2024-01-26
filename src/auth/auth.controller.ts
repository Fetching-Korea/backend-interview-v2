// auth.controller.ts

import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { loginFrom } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService, private jwtService: JwtService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const user = req.user;
    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  @Get('login')
  async loginT(@Body() loginFrom: loginFrom){
    return this.authService.validateUser(loginFrom);
  }

  @Get('test')
  async logintt(@Body() payload: any){
    return this.authService.decodeToken(payload.access_token);
  }

}
