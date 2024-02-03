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
import { UpdateProductDto } from './dto/update-product.dto';

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
    if (user.role === 'ADMIN' || user.id === found.provider.id) {
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

  async updateProduct(
    id: number,
    user: User,
    updateProductDto: UpdateProductDto,
  ): Promise<{ message: string; product: Product }> {
    const { description, price, options } = updateProductDto;

    const found = await this.productRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('존재하지 않는 상품입니다!');
    }

    if (found.provider.id !== user.id) {
      throw new UnauthorizedException('상품 수정 권한이 없습니다.');
    }

    // 업데이트할 필드만 변경
    if (description !== undefined) {
      found.description = description;
    }
    if (price !== undefined) {
      found.price = price;
    }
    if (options !== undefined) {
      // 각 옵션을 순회하면서 업데이트
      for (const updatedOption of options) {
        const existingOption = found.options.find(
          (option) =>
            option.size === updatedOption.size &&
            option.color === updatedOption.color,
        );
        if (existingOption) {
          // 기존 옵션이 존재하는 경우에는 해당 옵션의 store 값을 업데이트
          existingOption.store = updatedOption.store;
        } else {
          // 기존 옵션이 존재하지 않는 경우에는 새로운 옵션을 배열에 추가
          found.options.push(updatedOption);
        }
      }

      found.total_store = found.options.reduce(
        (acc, option) => acc + option.store,
        0,
      );
    }
    const updatedProduct = await this.productRepository.save(found);

    return {
      message: '상품을 성공적으로 업데이트하였습니다.',
      product: updatedProduct,
    };
  }

  async getProducts(
    filters: {
      category?: string;
      brand?: string;
      name?: string;
      sort?: string;
      min_price?: number;
      max_price?: number;
    } = {},
  ): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    // 동적으로 필터를 추가
    if (filters.category) {
      queryBuilder.andWhere('product.category = :category', {
        category: filters.category,
      });
    }
    if (filters.brand) {
      queryBuilder.andWhere('product.brand = :brand', {
        brand: filters.brand,
      });
    }
    if (filters.name) {
      queryBuilder.andWhere('product.name LIKE :name', {
        name: `%${filters.name}%`,
      });
    }
    if (filters.min_price) {
      queryBuilder.andWhere('product.price >= :min_price', {
        min_price: filters.min_price,
      });
    }
    if (filters.max_price) {
      queryBuilder.andWhere('product.price <= :max_price', {
        max_price: filters.max_price,
      });
    }

    if (filters.sort === 'createAt') {
      queryBuilder.orderBy('product.created_at', 'DESC'); // 최신순으로 정렬
    } else if (filters.sort === 'reviews') {
      queryBuilder
        .leftJoin('product.reviews', 'review')
        .addSelect('COUNT(review.id)', 'review_count')
        .groupBy('product.id')
        .orderBy('review_count', 'DESC'); // 리뷰 많은 순으로 정렬
    } else {
      // sort 값이 없거나 'view_count'인 경우 default로 view_count로 정렬
      queryBuilder.orderBy('product.view_count', 'DESC');
    }

    const products = await queryBuilder.getMany();
    return products;
  }
}
