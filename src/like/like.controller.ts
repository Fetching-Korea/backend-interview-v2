import { LikeService } from './like.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
}
