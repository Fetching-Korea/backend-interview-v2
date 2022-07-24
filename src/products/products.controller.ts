import { Body, Controller, Delete, Get, Param, Patch, Post, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
	constructor(private readonly productService: ProductsService) {}

	// 전체 product들을 가져온다. 인가가 필요없는 요청이다.
	@Public()
	@Get()
	@HttpCode(HttpStatus.OK)
	async getAll(): Promise<Product[]> {
		return this.productService.getAll();
	}

	// 필터링 작업을 해 product들을 가져온다. 쿼리스트링이 필요하다.
	// minCost <= x <= maxCost
	// minSize <= x <= maxSize
	// brand에 맞는 product만 필터링
	// color에 맞는 product만 필터링
	@Public()
	@Get("/filter")
	@HttpCode(HttpStatus.OK)
	async getFilter(@Query("minCost") minCost: number, @Query("maxCost") maxCost: number, // cost filtering
					@Query("minSize") minSize: string, @Query("maxSize") maxSize: string, // size filtering
					@Query("brand") brand: string, @Query("color") color: string)  // brand & color filtering
	{
		const payload = {
			minCost,
			maxCost,
			minSize,
			maxSize,
			brand,
			color
		}

		return this.productService.getFilter(payload);
	}

	// 정렬 작업을 해 product들을 가져온다.
	// orderBy 쿼리 스트링 여러 개를 이용해서 정렬을 진행한다.
	@Public()
	@Get("/sort")
	@HttpCode(HttpStatus.OK)
	async getSort(@Query("orderBy") orderBy: object)
	{
		return this.productService.getSort(orderBy); 
	}

	// ID에 맞는 product 하나만 가져온다.
	@Public()
	@Get("/:id")
	@HttpCode(HttpStatus.OK)
	async getOne(@Param("id") productId: number): Promise<Product> {
		return this.productService.getOne(productId);
	}

	// product를 생성할 때 사용한다.
	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() productData: CreateProductDto): Promise<Product> {
		return this.productService.create(productData);
	}

	// ID에 맞는 product 하나만 삭제한다.
	@Delete("/:id")
	@HttpCode(HttpStatus.OK)
	async remove(@Param('id') productId: number) {
		return this.productService.deleteOne(productId);
	}

	// ID에 맞는 product 하나만 수정한다.
	@Patch("/:id")
	@HttpCode(HttpStatus.OK)
	async patch(@Param('id') productId: number, @Body() productData: UpdateProductDto): Promise<Product> {
		return this.productService.update(productId, productData);
	}

}
