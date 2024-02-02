import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    console.log(user);
    if (user.role === 'CUSTOMER') {
      throw new UnauthorizedException('상품등록 권한이 없습니다');
    }
    const newProduct = await this.productRepository.createProduct(
      createProductDto,
      user,
    );
    return newProduct;
  }

  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('존재하지 않는 상품입니다!');
    }
    const result = await this.productRepository.update(
      { id },
      { view_count: found.view_count + 1 },
    );
    console.log(result);

    return found;
  }

  async deleteProductById(
    id: number,
    user: User,
  ): Promise<{ message: string }> {
    const found = await this.productRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('존재하지 않는 상품입니다!');
    }
    if (user.role === 'ADMIN' || user.email === found.provider.email) {
      const result = await this.productRepository.delete({ id });
      if (result.affected === 1) {
        return { message: '상품을 성공적으로 삭제하였습니다.' };
      } else {
        throw new InternalServerErrorException('상품 삭제에 실패하였습니다');
      }
    } else {
      throw new UnauthorizedException('상품 삭제 권한이 없습니다.');
    }
  }
}
