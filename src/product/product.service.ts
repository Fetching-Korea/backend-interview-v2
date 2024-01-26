import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, Size } from './entities/product.entity';
import { Repository } from 'typeorm';
import { searchProducts } from './dto/search-product.dto';
import { sortProducts } from './dto/sort-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product)
  private productRepository: Repository<Product>) { }

  async create(createProduceDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProduceDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, update: UpdateProductDto): Promise<number> {
    await this.productRepository.update(id, update);
    return id
  }

  async remove(id: number): Promise<number> {
    await this.productRepository.delete(id);
    return id
  }

  async searchProducts(searchProducts: searchProducts): Promise<Product[]> {
    const builder = this.productRepository.createQueryBuilder('product');

    // 동적 쿼리 작성
    if (searchProducts.name) {
      builder.andWhere('product.name LIKE :name', { name: `%${searchProducts.name}%` });
    }

    if (searchProducts.descript) {
      builder.andWhere('product.descript LIKE :descript', { descript: `%${searchProducts.descript}%` });
    }

    if (searchProducts.max_price) {
      builder.andWhere('product.price < :max_price', { max_price: searchProducts.max_price });
    }

    if (searchProducts.min_price) {
      builder.andWhere('product.price > :min_price', { min_price: searchProducts.min_price });
    }

    if (searchProducts.size) {
      builder.andWhere('product.size = :size', { size: searchProducts.size });
    }

    if (searchProducts.color) {
      builder.andWhere('product.color = :color', { color: searchProducts.color });
    }

    // 쿼리 실행
    return builder.getMany();
  }

  async findByName(name: string): Promise<Product> {
    return await this.productRepository.findOne({ where: { name } });
  }

  async sortProduct(sortProduct: sortProducts): Promise<Product[]> {
    const builder = this.productRepository.createQueryBuilder('product');

    // 동적 쿼리 작성
    if (sortProduct.name) {
      builder.addOrderBy('product.name', "ASC");
    }

    if (sortProduct.descript) {
      builder.addOrderBy('product.descript', "ASC");
    }

    if (sortProduct.brand){
      builder.addOrderBy('product.brand', "ASC");
    }

    if (sortProduct.price) {
      builder.addOrderBy('product.price', "ASC");
    }

    if (sortProduct.size) {
      builder.addOrderBy('product.size', "ASC");
    }

    if (sortProduct.color) {
      builder.addOrderBy('product.color', "ASC");
    }

    // 쿼리 실행
    return builder.getMany();
  }
}
