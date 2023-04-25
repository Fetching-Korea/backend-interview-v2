import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './.entity';
import {
  FindOneOptions,
  Not,
  Repository,
  Between,
  Like,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import {
  CreateProductDto,
  FilterDto,
  FilterProductDto,
  UpdateProductDto,
} from './.dto';
import { Sort } from '../enum/sort';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  private findAllSelection = {
    created_at: true,
    name: true,
    brand: true,
    price: true,
    discount: true,
  };

  create(createProductDto: CreateProductDto) {
    const product: Product = new Product();
    product.name = createProductDto.name;
    product.brand = createProductDto.brand;
    product.price = createProductDto.price;
    product.size = createProductDto.size;
    product.color = createProductDto.color;
    product.discount = createProductDto.discount;

    return this.productRepository.save(product);
  }
  findAll(sort: Sort): Promise<Product[]> {
    let order = {};
    if (sort === Sort.discount) {
      order = {
        discount: 'DESC',
      };
    } else if (sort === Sort.cheap) {
      order = {
        price: 'ASC',
      };
    } else if (sort === Sort.expensive) {
      order = {
        price: 'DESC',
      };
    }
    return this.productRepository.find({
      select: this.findAllSelection,
      order,
    });
  }
  findByFilter(filterProductDto: FilterProductDto) {
    const { minDiscount, maxDiscount, minPrice, maxPrice, brand } =
      filterProductDto;
    let filter = {};
    if (maxDiscount && minDiscount) {
      if (minDiscount > maxDiscount) {
        throw new UnprocessableEntityException(
          'minDiscount must be less than maxDiscount',
        );
      } else {
        filter = Object.assign(filter, {
          discount: Between(minDiscount, maxDiscount),
        });
      }
    } else {
      if (minDiscount) {
        filter = Object.assign(filter, {
          discount: MoreThanOrEqual(minDiscount),
        });
      } else if (maxDiscount) {
        filter = Object.assign(filter, {
          discount: LessThanOrEqual(maxDiscount),
        });
      }
    }

    if (maxPrice && minPrice) {
      if (minPrice > maxPrice) {
        throw new UnprocessableEntityException(
          'minPrice must be less than maxPrice',
        );
      } else {
        filter = Object.assign(filter, {
          discount: Between(minPrice, maxPrice),
        });
      }
    } else {
      if (minPrice) {
        filter = Object.assign(filter, {
          price: MoreThanOrEqual(minPrice),
        });
      } else if (maxPrice) {
        filter = Object.assign(filter, {
          price: LessThanOrEqual(maxPrice),
        });
      }
    }
    if (brand) {
      filter = Object.assign(filter, {
        brand: Like(`%${brand}%`),
      });
    }
    console.log(filter);
    return this.productRepository.findBy(filter);
  }
  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      select: {
        ...this.findAllSelection,
        id: true,
        description: true,
        size: true,
        color: true,
      },
      where: {
        id,
      },
    });
  }
  updateOne(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({ id }, updateProductDto);
  }
  delete(id: number) {
    return this.productRepository.softDelete({ id });
  }
}
