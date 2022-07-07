import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductIdDto } from './dto/productId.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async productList(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async createProduct(input: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.create({...input}).save();
    if (!newProduct) throw new InternalServerErrorException();
    return newProduct;
  }

  async updateProduct(input: UpdateProductDto): Promise<Product> {
    const { id, name, desc, brand, price, size, color } = input;
    const target = await this.findOneById(id);
    if (!target) throw new BadRequestException('해당 상품이 존재하지 않습니다');
    target.name = name;
    target.desc = desc;
    target.brand = brand;
    target.price = price;
    target.size = size;
    target.color = color;
    const res = await this.productRepository.save(target);
    return res;
  }

  async findOneById(id: number): Promise<Product> {
    return await this.productRepository.findOne({
        where: {
            id
        }
    })
  }

  async getProductDetail(input: ProductIdDto): Promise<Product> {
    const productDetail = await this.findOneById(input.id);
    if (!productDetail) throw new BadRequestException('해당 상품이 존재하지 않습니다');
    return productDetail;
  }

  async deleteProduct(input: ProductIdDto): Promise<Boolean> {
    const res = await this.productRepository.delete(input.id);
    if (res.affected && res.affected == 1) return true;
    throw new BadRequestException('해당 상품이 존재하지 않습니다')
  }
}
