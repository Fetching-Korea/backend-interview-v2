import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { ProductRepository } from 'src/product/product.repository';
import { User } from 'src/users/user.entity';
@Injectable()
export class LikeService {
  constructor(
    private productRepository: ProductRepository,
    private likeRepository: LikeRepository,
  ) {}

  async createLike(user: User, productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    console.log(product);
    if (!product) {
      throw new NotFoundException('존재하지 않는 상품입니다!');
    }
    const existsLike = await this.likeRepository.exists({
      where: { user: { id: user.id }, product: { id: productId } },
    });
    if (existsLike) {
      throw new ConflictException('이미 찜한 상품입니다.');
    }
    const newLike = this.likeRepository.create({
      user: { id: user.id },
      product: { id: productId },
    });
    const result = await this.likeRepository.save(newLike);
    return { message: '찜 성공!', result };
  }

  async deleteLike(user: User, id: number): Promise<{ message: string }> {
    const found = await this.likeRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!found) {
      //존재하지 않는 찜
      throw new ConflictException('찜한적 없음 이거 나오면 안됨..');
    }
    if (user.id === found.user.id) {
      try {
        await this.likeRepository.delete({ id });
        return { message: '찜 취소 성공!' };
      } catch (err) {
        throw new InternalServerErrorException(err);
      }
    } else {
      throw new UnauthorizedException('찜 삭제권한이 없습니다!');
    }
  }
}
