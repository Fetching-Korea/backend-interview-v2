import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductUpdateDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { productSortParsing } from './product-sort';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(createDto: ProductCreateDto) {
    const product = new ProductEntity();
    product.name = createDto.name;
    product.description = createDto.description;
    product.brandName = createDto.brandName;
    product.price = createDto.price;
    product.mainImage = createDto.mainImage;

    await this.productRepository.save(product);

    return true;
  }

  async update(updateDto: ProductUpdateDto) {
    const { id, name, description, brandName, price, mainImage } = updateDto;
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('product is not exist');
    }

    product.name = name;
    product.description = description;
    product.brandName = brandName;
    product.price = price;
    product.mainImage = mainImage;

    await this.productRepository.save(product);
    return true;
  }

  async remove(id: number) {
    await this.productRepository.softDelete(id);
    return `${id} product removed`;
  }

  async findAll(
    page: number,
    take: number,
    sort: string,
    minPrice: number,
    maxPrice: number,
    name?: string,
    brandName?: string,
  ) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    queryBuilder.skip(take * (page - 1));
    queryBuilder.take(take);

    if (minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: minPrice,
      });
    }

    if (maxPrice > 0) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: maxPrice,
      });
    }

    if (brandName) {
      queryBuilder.andWhere('product.brand_name like :brandName', {
        brandName: `%${brandName}%`,
      });
    }

    if (name) {
      queryBuilder.andWhere('product.name like :name', {
        name: `%${name}%`,
      });
    }
    const { sortColumn, ascOrDesc } = productSortParsing(sort);
    queryBuilder.orderBy(`product.${sortColumn}`, `${ascOrDesc}`);

    const productList = await queryBuilder.getMany();
    return { productList: productList, currentPage: page };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    return product;
  }
}
