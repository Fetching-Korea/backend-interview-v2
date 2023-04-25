import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './.entity';
import { Like, Repository } from 'typeorm';
import { CreateCommentDto } from './.dto';
import { ProductService } from 'src/Product/.service';
import { UserService } from 'src/User/.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const product = await this.productService.findOne(createCommentDto.pid);
    const user = await this.userService.findById(createCommentDto.uid);

    const comment = new Comment();
    comment.user = user;
    comment.product = product;
    comment.comment = createCommentDto.comment;
    console.log(product);
    return await this.commentRepository.insert(comment);
  }

  findByComment(comment_fragment: string) {
    return this.commentRepository.find({
      where: {
        comment: Like(`%${comment_fragment}%`),
      },
      relations: ['user', 'product'],
    });
  }
}
