import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductUpdateDto } from './dto/update-product.dto';
import { ProductSortPipe } from '../common/product-sort.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('take', new DefaultValuePipe(50), ParseIntPipe) take: number,
    @Query('sort', new DefaultValuePipe('createdAt_DESC'), ProductSortPipe)
    sort: string,
    @Query('minPrice', new DefaultValuePipe(0), ParseIntPipe) minPrice: number,
    @Query('maxPrice', new DefaultValuePipe(-1), ParseIntPipe) maxPrice: number,
    @Query('name') name?: string,
    @Query('branName') brandName?: string,
  ) {
    return this.productService.findAll(
      page,
      take,
      sort,
      minPrice,
      maxPrice,
      name,
      brandName,
    );
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(+id);
  }

  @Post()
  async create(@Body() createDto: ProductCreateDto) {
    await this.productService.create(createDto);
    return;
  }

  @Patch()
  async update(@Body() updateDto: ProductUpdateDto) {
    await this.productService.update(updateDto);
    return true;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
