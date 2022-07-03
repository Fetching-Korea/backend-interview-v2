import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductInsertReqDto } from './dto/product-insert-req.dto';
import { ProductService } from './product.service';
import { ErrorResponseDto } from '../shared/dto/error-response.dto';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../auth/jwt.guard';
import { ProductDetailResDto } from './dto/product-detail-res.dto';

@ApiResponse({
  status: 401,
  description: 'Unauthorized.',
  type: ErrorResponseDto,
})
@ApiResponse({ status: 403, description: 'Forbidden.', type: ErrorResponseDto })
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('controller-product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly authService: AuthService,
    private readonly productService: ProductService,
  ) {}

  @ApiTags('for-admin')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 201,
    description: 'Product information',
    type: ProductDetailResDto,
  })
  @ApiOperation({
    description: 'Insert a product',
  })
  @Post()
  async insert(
    @Request() req,
    @Body() productInsertReqDto: ProductInsertReqDto,
  ) {
    if (!req.user.isAdmin) throw new UnauthorizedException();
    const newProduct = await this.productService.insert(productInsertReqDto);

    return <ProductDetailResDto>{
      product: newProduct,
    };
  }
}
