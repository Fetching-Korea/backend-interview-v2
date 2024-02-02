import {
  Controller,
  UseGuards,
  ValidationPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator'; // 경로 수정 필요
import { Product } from './product.entity';
import { User } from '../users/user.entity'; // 경로 수정 필요
import { CreateProductDto } from './dto/create-product.dto';
import { UsePipes } from '@nestjs/common'; // UsePipes import 추가

@Controller('product') // 'products' -> 'product'로 수정 필요
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private productService: ProductService) {} // 생성자 수정 필요

  @Post()
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() createProductDto: CreateProductDto, // @Body() Decorator 추가
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @GetUser() user: User,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto, user);
  }
}
