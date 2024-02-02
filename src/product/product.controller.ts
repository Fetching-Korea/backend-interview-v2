import {
  Controller,
  UseGuards,
  ValidationPipe,
  Post,
  Body,
  Param,
  Get,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator'; // 경로 수정 필요
import { Product } from './product.entity';
import { User } from '../users/user.entity'; // 경로 수정 필요
import { CreateProductDto } from './dto/create-product.dto';
import { UsePipes } from '@nestjs/common'; // UsePipes import 추가

@Controller('api')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('products')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @GetUser() user: User,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto, user);
  }

  @Get('product/:id')
  getProductById(@Param('id') id: number): Promise<Product> {
    console.log(id);
    return this.productService.getByBoardId(id);
  }
}
