import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './.entity';
import { Like, Repository } from 'typeorm';
import { Product } from 'src/product/.entity';
import { User } from 'src/User/.entity';
import { CreateCommentDto } from './.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.save(createCommentDto);
  }

  findByComment(comment_fragment: string) {
    return this.commentRepository.find({
      where: {
        comment: Like(`%${comment_fragment}%`),
      },
    });
  }
}
