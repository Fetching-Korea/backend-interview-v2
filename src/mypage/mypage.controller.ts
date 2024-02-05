import { Controller, Get, UseGuards } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { GetUser } from 'src/users/get-user.decorator';
import { Review } from 'src/review/review.entity';

@Controller('/auth/mypage')
export class MypageController {
  constructor(private myPageService: MypageService) {}
  @Get('reviews')
  @UseGuards(AuthGuard())
  getMyReviews(@GetUser() user: User): Promise<Review[]> {
    return this.myPageService.getMyReviews(user);
  }
}
