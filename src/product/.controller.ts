import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './.service';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from './.dto';
import { Sort } from '../enum/sort';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }
  @Get('/')
  findAll(@Query('sort') sort: Sort) {
    return this.productService.findAll(sort);
  }
  @Post('/filter')
  findBy(@Body() filterProductDto: FilterProductDto) {
    return this.productService.findByFilter(filterProductDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productService.updateOne(+id, body);
  }
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
