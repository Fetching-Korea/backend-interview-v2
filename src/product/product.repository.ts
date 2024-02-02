import { CustomRepository } from 'src/typeorm-setting/typeorm-ex.decorator';
import { Product } from './product.entity';
import { User } from 'src/users/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository } from 'typeorm';

@CustomRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { name, description, brand, price, options, category } = createProductDto;

    const totalStore = this.calculateTotalStore(options);

    const product = this.create({
      name,
      description,
      brand,
      price,
      options,
      category,
      total_store: totalStore,
    });

    // 제품을 저장합니다.
    await this.saveProduct(product);
    return product;
  }

  // 옵션의 총 재고량을 계산하는 함수
  private calculateTotalStore(options: CreateProductDto['options']): number {
    let totalStore = 0;
    if (options) {
      totalStore = options.reduce((acc, option) => acc + option.store, 0);
    }
    return totalStore;
  }

  // 제품을 저장하는 함수
  private async saveProduct(product: Product): Promise<Product> {
    return await this.save(product);
  }
}
