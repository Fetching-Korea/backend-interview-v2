import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { FilterPayload } from './types';

@Injectable()
export class ProductsService {
	constructor(private prismaService: PrismaService){}

	async getAll(): Promise<Product[]> {
		const products = await this.prismaService.product.findMany({});
		return products;
	}

	async getOne(productId: number): Promise<Product> {
		const product = await this.prismaService.product.findFirst({
			where: { productId }
		});

		if (!product) {
			throw new NotFoundException("product not found");
		}
		return product;
	}

	async getFilter(payload: FilterPayload): Promise<Product[]> {
		const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

		const result = await this.prismaService.product.findMany({
			where: {
				AND: [
					{ brand: payload.brand },
					{ color: payload.color },
					{ cost: { 
						gte: payload.minCost ? payload.minCost : 0,
						lte: payload.maxCost ? payload.maxCost : Number.MAX_SAFE_INTEGER
					}},
					{ size: {
						gte: payload.minSize ? sizes.indexOf(payload.minSize) : 0,
						lte: payload.maxSize ? sizes.indexOf(payload.maxSize) : 5
					}}
				]
			}
		});
		return result;
	}

	async create(productData: CreateProductDto): Promise<Product> {
		const product = await this.prismaService.product.create({
			data: productData
		});

		return product;
	}

	async deleteOne(id: number) {
		await this.getOne(id);
		await this.prismaService.product.delete({
			where: {
				productId: id
			}
		})
	}

	async update(id: number, updateData: UpdateProductDto) {
		const updateProduct = await this.prismaService.product.update({
			where: { productId: id },
			data: updateData
		});
		
		return updateProduct;
	}
}
