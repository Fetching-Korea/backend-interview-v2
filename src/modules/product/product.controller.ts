import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
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
  ApiQuery,
} from '@nestjs/swagger';
import { ProductUpdateReqDto } from './dto/product-update-req.dto';
import { ProductService } from './product.service';
import { ErrorResponseDto } from '../shared/dto/error-response.dto';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../auth/jwt.guard';
import { ProductDetailResDto } from './dto/product-detail-res.dto';
import { EnumColors, EnumOrderBy, EnumSizes } from './product.entity';
import { ProductListResDto } from './dto/product-list-res.dto';

@ApiResponse({
  status: 400,
  description: 'BadRequest.',
  type: ErrorResponseDto,
})
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
    @Body() productUpdateReqDto: ProductUpdateReqDto,
  ) {
    if (!req.user.isAdmin) throw new UnauthorizedException();
    const newProduct = await this.productService.insert(productUpdateReqDto);

    return <ProductDetailResDto>{
      product: newProduct,
    };
  }

  @ApiTags('for-admin')
  @ApiResponse({
    status: 200,
    description: 'The found record is executed',
    type: Boolean,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({
    description: 'Delete specific product',
  })
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    if (!req.user.isAdmin) throw new UnauthorizedException();
    return this.productService.deleteOne(id);
  }

  @ApiTags('for-admin')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 200,
    description: 'Product information',
    type: ProductDetailResDto,
  })
  @ApiOperation({
    description: 'Update a product',
  })
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: number,
    @Body() productUpdateReqDto: ProductUpdateReqDto,
  ) {
    if (!req.user.isAdmin) throw new UnauthorizedException();
    const product = await this.productService.update(id, productUpdateReqDto);

    return <ProductDetailResDto>{
      product: product,
    };
  }

  @ApiTags('for-guest')
  @ApiTags('for-user')
  @ApiTags('for-admin')
  @ApiResponse({
    status: 200,
    description: 'Product information',
    type: ProductDetailResDto,
  })
  @ApiOperation({
    description: 'Get detail of product',
  })
  @Get(':id')
  async detail(@Param('id') id: number) {
    const product = await this.productService.findOne(id);

    return <ProductDetailResDto>{
      product: product,
    };
  }

  @ApiTags('for-guest')
  @ApiTags('for-user')
  @ApiTags('for-admin')
  @ApiQuery({
    name: 'pageNumber',
    type: Number,
    allowEmptyValue: false,
    required: true,
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    allowEmptyValue: false,
    required: true,
    example: 30,
  })
  @ApiQuery({
    name: 'brandFilter',
    type: String,
    allowEmptyValue: true,
    required: false,
  })
  @ApiQuery({
    name: 'sizeFilter',
    type: String,
    enum: EnumSizes,
    allowEmptyValue: true,
    required: false,
  })
  @ApiQuery({
    name: 'colorFilter',
    type: String,
    enum: EnumColors,
    allowEmptyValue: true,
    required: false,
  })
  @ApiQuery({
    name: 'orderBy',
    type: String,
    enum: EnumOrderBy,
    isArray: true,
    allowEmptyValue: true,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'List and count of products',
    type: ProductListResDto,
  })
  @ApiOperation({
    description: 'Get list of products',
  })
  @Get('')
  async list(@Query() query) {
    const productList = await this.productService.listProducts(
      query.pageNumber || 1,
      query.pageSize || 30,
      query.brandFilter,
      EnumSizes[String(query.sizeFilter)],
      EnumColors[String(query.colorFilter)],
      'string' === typeof query.orderBy ? [query.orderBy] : query.orderBy,
    );

    return productList;
  }
}
