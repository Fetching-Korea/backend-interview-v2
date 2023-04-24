import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { CommentService } from './.service';
import { CreateCommentDto } from './.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }
  @Get('/')
  findByComment(@Query('comment') comment: string) {
    return this.commentService.findByComment(comment);
  }
}
