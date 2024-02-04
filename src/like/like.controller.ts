import { LikeService } from './like.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { GetUser } from 'src/users/get-user.decorator';

@Controller('api/like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createLike(
    @Body('productId') productId: number,
    @GetUser() user: User,
  ) {
    console.log(productId, user);
    return this.likeService.createLike(user, productId);
  }
  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteLike(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    return this.likeService.deleteLike(user, id);
  }
}
