import {
  Controller,
  UseGuards,
  ValidationPipe,
  Post,
  Body,
  Param,
  Get,
  Delete,
  UnauthorizedException,
  Patch,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator'; // 경로 수정 필요
import { Product } from './product.entity';
import { User } from '../users/user.entity'; // 경로 수정 필요
import { CreateProductDto } from './dto/create-product.dto';
import { UsePipes } from '@nestjs/common'; // UsePipes import 추가
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @GetUser() user: User,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto, user);
  }

  @Get('/:id')
  getProductById(@Param('id') id: number): Promise<Product> {
    console.log(id);
    return this.productService.getProductById(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteProductById(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    if (user.role === 'CUSTOMER') {
      throw new UnauthorizedException('상품 삭제 권한이 없습니다.');
    }
    return this.productService.deleteProductById(id, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateProduct(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<{ message: string; product: Product }> {
    if (user.role === 'SELLER') {
      return this.productService.updateProduct(id, user, updateProductDto);
    } else {
      throw new UnauthorizedException('상품 수정 권한이 없습니다.');
    }
  }

  @Get()
  async getProducts(
    @Query('category') category?: string,
    @Query('brand') brand?: string,
    @Query('name') name?: string,
    @Query('sort') sort?: string,
    @Query('min_price') min_price?: number,
    @Query('max_price') max_price?: number,
  ): Promise<Product[]> {
    const products = await this.productService.getProducts({
      category,
      brand,
      name,
      sort,
      min_price,
      max_price,
    });
    return products;
  }
}
