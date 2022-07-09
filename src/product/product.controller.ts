import { Body, Controller, Get, Post, UseGuards, Request, Put, Delete, Param, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateProductDto } from './dto/createProduct.dto';
import { FilterProductDto } from './dto/filterProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /** 상품 리스트 + 필터링 및 정렬 */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/list')
  async register(@Body() input: FilterProductDto): Promise<Product[]> {
    return this.productService.productList(input);
  }

  /** 상품 생성 */
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/create')
  async createProduct(@Body() input: CreateProductDto, @Request() { user }: any): Promise<Product> {
    return await this.productService.createProduct(input, user);
  }

  /** 상품 수정 */
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/update')
  async updateProduct(@Body() input: UpdateProductDto, @Request() { user }: any): Promise<Product> {
    return await this.productService.updateProduct(input, user);
  }

  /** 상품 삭제 */
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id: number, @Request() { user }: any): Promise<Boolean> {
    return await this.productService.deleteProduct(id, user);
  }

  /** 상품 상세 */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/detail/:id')
  async getProductDetail(@Param('id') id: number): Promise<Product> {
    return await this.productService.getProductDetail(id);
  }
}
