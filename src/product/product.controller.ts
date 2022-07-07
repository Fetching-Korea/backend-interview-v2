import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductIdDto } from './dto/productId.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /** 상품 리스트 */
  @Get('/list')
  async register(): Promise<Product[]> {
    return this.productService.productList();
  }

  /** 상품 생성 */
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createProduct(@Body() input: CreateProductDto): Promise<Product> {
    return await this.productService.createProduct(input);
  }

  /** 상품 수정 */
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async updateProduct(@Body() input: UpdateProductDto): Promise<Product> {
    return await this.productService.updateProduct(input);
  }

  /** 상품 삭제 */
  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  async deleteProduct(@Body() input: ProductIdDto): Promise<Boolean> {
    return await this.productService.deleteProduct(input);
  }

  /** 상품 상세 */
  @Get('/detail')
  async getProductDetail(@Body() input: ProductIdDto): Promise<Product> {
    return await this.productService.getProductDetail(input);
  }
}
