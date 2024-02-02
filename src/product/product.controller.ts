import { Controller, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private productService: ProductService) {}
//   @Post()
//   @UsePipes(ValidationPipe)
//   createProduct(
//     @Body() createProductDto: 
//   )
}
