import {
  Injectable,
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

  async getByBoardId(id: number): Promise<Product> {
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
}
