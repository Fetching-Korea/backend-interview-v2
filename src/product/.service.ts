import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './.entity';
import { FindOneOptions, Not, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './.dto';
import { Sort } from '../enum/sort';

@Injectable()
export class ProductService {
  private findAllSelection = {
    created_at: true,
    name: true,
    brand: true,
    price: true,
    discount: true,
  };
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
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
  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      select: {
        ...this.findAllSelection,
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
