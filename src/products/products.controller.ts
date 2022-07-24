import { Body, Controller, Delete, Get, Param, Patch, Post, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
	constructor(private readonly productService: ProductsService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAll(): Promise<Product[]> {
		return this.productService.getAll();
	}

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

	@Get("/sort")  // brand, cost, size, name
	@HttpCode(HttpStatus.OK)
	async getSort(@Query("orderBy") orderBy: object)
	{
		return this.productService.getSort(orderBy); 
	}

	@Get("/:id")
	@HttpCode(HttpStatus.OK)
	async getOne(@Param("id") productId: number): Promise<Product> {
		return this.productService.getOne(productId);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() productData: CreateProductDto): Promise<Product> {
		return this.productService.create(productData);
	}

	@Delete("/:id")
	@HttpCode(HttpStatus.OK)
	async remove(@Param('id') productId: number) {
		return this.productService.deleteOne(productId);
	}

	@Patch("/:id")
	@HttpCode(HttpStatus.OK)
	async patch(@Param('id') productId: number, @Body() productData: UpdateProductDto): Promise<Product> {
		return this.productService.update(productId, productData);
	}

}
