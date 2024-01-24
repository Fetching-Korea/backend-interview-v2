import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

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
}
