import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto, ProductOptionDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { User } from 'src/users/user.entity';
import {
  UpdateProductDto,
  UpdateProductOptionDto,
} from './dto/update-product.dto';
import { SelectQueryBuilder } from 'typeorm';
import { ProductOption } from 'src/product-option/product-option.entity';
import { ProductOptionRepository } from 'src/product-option/product-option.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private productOptionRepository: ProductOptionRepository, // ProductOptionRepository 주입
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    options: ProductOptionDto[], // 옵션 정보 추가
    user: User,
  ): Promise<{
    message: string;
    product: Product;
    options: Partial<ProductOption>[];
  }> {
    const { name, description, brand, price, category } = createProductDto;
    if (user.role !== 'SELLER') {
      throw new UnauthorizedException('판매자 권한이 필요합니다.');
    }

    const product = new Product();
    product.name = name;
    product.description = description;
    product.brand = brand;
    product.price = price;
    product.category = category;
    product.provider = user;
    product.total_store = 0; // 재고 초기화

    try {
      // Product 저장
      await this.productRepository.save(product);

      const savedOptions: ProductOption[] = [];

      // ProductOption 저장
      if (options && options.length > 0) {
        for (const optionDto of options) {
          const option = new ProductOption();
          option.size = optionDto.size;
          option.color = optionDto.color;
          option.store = optionDto.store;
          option.product = product; // 해당 제품의 ID 설정
          const savedOption = await this.productOptionRepository.save(option);
          savedOptions.push(savedOption); // 저장된 옵션을 배열에 추가
          product.total_store += option.store; // 총 재고량 누적
        }
      }
      // 총 재고량 반영을 위해 제품 업데이트
      await this.productRepository.save(product);

      // product 정보와 options 배열에서 product 정보를 제외한 배열을 반환
      const partialOptions = savedOptions.map(({ size, color, store, id }) => ({
        size,
        color,
        store,
        id,
      }));

      product.provider = { nickname: user.nickname, email: user.email } as User;

      return {
        message: '상품이 성공적으로 등록되었습니다',
        product,
        options: partialOptions,
      };
    } catch (error) {
      throw new InternalServerErrorException('상품 생성에 실패했습니다.');
    }
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.provider', 'provider')
      .select(['product', 'provider.nickname'])
      .where('product.id = :id', { id })
      .getOne();

    if (!product) {
      throw new NotFoundException('존재하지 않는 상품입니다!');
    }

    product.view_count++;
    await this.productRepository.save(product);

    return product;
  }

  async deleteProductById(
    id: number,
    user: User,
  ): Promise<{ message: string }> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['options'],
    });
    if (!product) {
      throw new NotFoundException('존재하지 않는 상품입니다!');
    }

    // 판매자가 아닌 경우 또는 상품 소유자가 아닌 경우 예외 처리
    if (user.id !== product.provider.id) {
      throw new UnauthorizedException('상품 삭제 권한이 없습니다.');
    }

    try {
      // ProductOption 삭제
      if (product.options && product.options.length > 0) {
        await Promise.all(
          product.options.map(async (option) => {
            await this.productOptionRepository.delete(option.id);
          }),
        );
      }

      // Product 삭제
      const result = await this.productRepository.delete(id);
      if (result.affected === 1) {
        return { message: '상품을 성공적으로 삭제하였습니다.' };
      } else {
        throw new InternalServerErrorException('상품 삭제에 실패하였습니다');
      }
    } catch (error) {
      throw new InternalServerErrorException('상품 삭제에 실패하였습니다');
    }
  }

  async updateProduct(
    id: number,
    user: User,
    updateProductDto: UpdateProductDto,
  ): Promise<{ message: string; product: Product }> {
    const { description, price } = updateProductDto;

    const found = await this.productRepository.findOne({
      where: { id },
    });
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
    const updatedProduct = await this.productRepository.save(found);

    // provider의 nickname만 표시되도록 수정
    const providerNickname = user.nickname;
    updatedProduct.provider = { nickname: providerNickname } as User;

    return {
      message: '상품을 성공적으로 업데이트하였습니다.',
      product: updatedProduct,
    };
  }

  async updateProductOption(
    productId: number,
    user: User,
    updateProductOptionDto: UpdateProductOptionDto[],
  ): Promise<{ message: string }> {
    // 상품 옵션들을 찾습니다.
    const options = await this.productOptionRepository.find({
      where: { product: { id: productId } },
      relations: ['product', 'product.provider'], // provider와 같은 관련 엔티티를 로드합니다.
    });

    // 상품이 존재하지 않는 경우 예외 처리합니다.
    if (!options || options.length === 0) {
      throw new NotFoundException('해당 상품의 옵션이 존재하지 않습니다.');
    }
    console.log(options[0]);
    // 해당 사용자가 상품 소유자인지 확인합니다.
    if (user.id !== options[0].product.provider.id) {
      throw new UnauthorizedException('상품 옵션을 수정할 권한이 없습니다.');
    }

    // 각 옵션을 업데이트합니다.
    for (const optionDto of updateProductOptionDto) {
      const option = options.find(
        (opt) => opt.size === optionDto.size && opt.color === optionDto.color,
      );
      if (option) {
        option.store = optionDto.store;
        await this.productOptionRepository.save(option);
      }
    }
    // 총 재고량 다시 계산
    const totalStore = options.reduce((acc, option) => acc + option.store, 0);
    options[0].product.total_store = totalStore;
    await options[0].product.save();

    return { message: '상품 옵션을 성공적으로 업데이트하였습니다.' };
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
    } else if (filters.sort === 'goodReview') {
      await orderByGoodReview(queryBuilder); // 좋은 리뷰 기준으로 정렬
    } else {
      // sort 값이 없거나 'view_count'인 경우 default로 view_count로 정렬
      queryBuilder.orderBy('product.view_count', 'DESC');
    }

    const products = await queryBuilder.getMany();
    return products;
  }
}
async function orderByGoodReview(
  queryBuilder: SelectQueryBuilder<any>,
): Promise<any> {
  const products = await queryBuilder
    .leftJoin('product.reviews', 'review')
    .addSelect(
      'COALESCE(AVG(CASE WHEN review.id IS NOT NULL THEN review.satisfaction_level ELSE 0 END), 0)',
      'avg_satisfaction_level',
    )
    .groupBy('product.id')
    .orderBy('avg_satisfaction_level', 'DESC')
    .getMany();

  return products;
}
