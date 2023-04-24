import { Module } from '@nestjs/common';
import { CommentController } from './.controller';
import { CommentService } from './.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './.entity';
import { User } from 'src/User/.entity';
import { Product } from 'src/product/.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Product])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
