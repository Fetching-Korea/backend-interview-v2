import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserLikeService } from './userlike.service';

@Controller('like')
export class UserLikeController {
  constructor(
    private readonly userlikeService: UserLikeService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Post(':id')
  async like(request: Request, @Param('id') goodsId: string): Promise<void> {
    const jwt = request.headers.authorization.split('Bearer ')[1];

    const userInfo = this.authService.verify(jwt);
    return this.userlikeService.likeGoods(userInfo.id, goodsId);
  }
}
