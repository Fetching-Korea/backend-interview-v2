import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { FilterProductDto } from './dto/filterProduct.dto';
import { PayloadDto } from '../utils/payload.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly userService: UserService
  ) {}

  async productList(input: FilterProductDto): Promise<Product[]> {
    const tm = this.productRepository.createQueryBuilder('product');

    if (input.id) tm.andWhere('id = :id', { id: input.id });
    if (input.name) tm.andWhere('name = :name', { name: input.name });
    if (input.brand) tm.andWhere('brand = :brand', { brand: input.brand });
    if (input.size) tm.andWhere('size = :size', { size: input.size });

    if (input.id_order) tm.addOrderBy('product.id', input.id_order);
    if (input.name_order) tm.addOrderBy('product.name', input.name_order);
    if (input.brand_order) tm.addOrderBy('product.brand', input.brand_order);
    if (input.size_order) tm.addOrderBy('product.size', input.size_order);

    const productList = await tm.getMany();

    return productList;
  }

  async createProduct(input: CreateProductDto, payload: PayloadDto): Promise<Product> {
    // admin 권한이 있는지 확인
    await this.userService.isAdmin(payload);

    // 데이터 삽입
    const newProduct = await this.productRepository.create({ ...input }).save();
    if (!newProduct) throw new InternalServerErrorException();
    return newProduct;
  }

  async updateProduct(input: UpdateProductDto, payload: PayloadDto): Promise<Product> {
    // admin 권한이 있는지 확인
    await this.userService.isAdmin(payload);

    // 상품 업데이트
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
        id,
      },
    });
  }

  async getProductDetail(id: number): Promise<Product> {
    const productDetail = await this.findOneById(id);
    if (!productDetail)
      throw new BadRequestException('해당 상품이 존재하지 않습니다');
    return productDetail;
  }

  async deleteProduct(id: number, payload: PayloadDto): Promise<Boolean> {
    // admin 권한이 있는지 확인
    await this.userService.isAdmin(payload);

    const res = await this.productRepository.delete(id);
    if (res.affected && res.affected == 1) return true;
    return false
  }
}
