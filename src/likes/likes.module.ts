import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService, PrismaService]
})
export class LikesModule {}
