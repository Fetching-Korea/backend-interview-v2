import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  /*
  1. login 함수 수행 전에 UseGuard로 id, pw 검증
  2. id, pw가 맞으면 login 함수 수행 -> jwt 발급 (ttl: 1day)
  3. jwt를 가지고 활동 진행
  */
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
