import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(CreatePostDto: CreatePostDto): Promise<Post> {
    // 사용자와 제품 엔터티를 찾아옴
    const userId = CreatePostDto.userId;
    const productId = CreatePostDto.productId;
    const user = await this.userRepository.findOne({
      where: {id:userId}
    });
    const product = await this.productRepository.findOne({
      where: {id:productId}
    });

    // 주문 엔터티 생성 및 연관관계 설정
    const newPost = new Post();
    newPost.user = user;
    newPost.product = product;
    newPost.review = CreatePostDto.review;
    newPost.likes = 0;

    // 주문 엔터티 저장
    return await this.postRepository.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: {
        id
      }, relations: ['user', 'product']
    });
  }

  async update(id: number, update: UpdatePostDto): Promise<number> {
    await this.postRepository.update(id, update);
    return id
  }

  async remove(id: number): Promise<number> {
    await this.postRepository.delete(id);
    return id;
  }

  async addLike(id: number): Promise<number> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) {
      post.addLike();  // 예시로, addLike 메서드는 실제로 어떻게 구현되었는지에 따라 적절히 수정해야 합니다.
      await this.postRepository.save(post);  // 변경사항 저장
      return post.id;
    } else {
      throw new Error('Post not found');  // 포스트를 찾을 수 없을 경우 에러 처리
    }
  }
}
