import { Controller, Get, UseGuards } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { GetUser } from 'src/users/get-user.decorator';
import { Review } from 'src/review/review.entity';

@Controller('/auth/mypage')
@UseGuards(AuthGuard())
export class MypageController {
  constructor(private myPageService: MypageService) {}
  @Get('reviews')
  getMyReviews(@GetUser() user: User) {
    return this.myPageService.getMyReviews(user);
  }

  @Get('likes')
  getMyLikes(@GetUser() user: User) {
    return this.myPageService.getMyLikes(user);
  }
}
