import { Module } from '@nestjs/common';
import { UserLikeController } from './userlike.controller';
import { UserLikeService } from './userlike.service';

@Module({
  controllers: [UserLikeController],
  providers: [UserLikeService],
})
export class UserLikeModule {}
