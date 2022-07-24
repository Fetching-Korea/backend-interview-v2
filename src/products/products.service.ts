import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { FilterPayload } from './types';
import { Prisma } from '@prisma/client';

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

	async getSort(orderBy: object): Promise<unknown> {
		let array;
		if (typeof orderBy === "string") {
			array = [orderBy];
		} else {
			array = Object.values(orderBy);
		}
		let baseQuery = ``;

		for (let i = 0; i < array.length; i++)
		{
			if (i !== 0 && (array[i] === 'brand_ASC' || array[i] === 'brand_DESC' || array[i] === 'cost_ASC' ||
							array[i] === 'cost_DESC' || array[i] === 'size_ASC'   || array[i] === 'size_DESC' ||
							array[i] === 'name_ASC'  || array[i] === 'name_DESC')) 
			{
				baseQuery += ', ';
			}

			switch(array[i]) {
				case 'brand_ASC':
					baseQuery += `brand ASC`;
					break;
				case 'brand_DESC':
					baseQuery += `brand DESC`;
					break;
				case 'cost_ASC':
					baseQuery += `cost ASC`;
					break;
				case 'cost_DESC':
					baseQuery += `cost DESC`;
					break;
				case 'size_ASC':
					baseQuery += `size ASC`;
					break;
				case 'size_DESC':
					baseQuery += `size DESC`;
					break;
				case 'name_ASC':
					baseQuery += `name ASC`;
					break;
				case 'name_DESC':
					baseQuery += `name DESC`;
					break;
			}
		}

		const result = await this.prismaService.$queryRaw`SELECT * FROM Product ORDER BY ${Prisma.raw(baseQuery)}`;

		return result;
	}

	async create(productData: CreateProductDto): Promise<Product> {
		const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

		let realData = {
			name: productData.name,
			explanation: productData.explanation,
			brand: productData.brand,
			cost: productData.cost,
			size: sizes.indexOf(productData.size),
			color: productData.color
		}

		const product = await this.prismaService.product.create({
			data: realData
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
		const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

		let realData; 
		if (updateData.size) {
			realData = {
				name: updateData.name,
				explanation: updateData.explanation,
				brand: updateData.brand,
				cost: updateData.cost,
				size: sizes.indexOf(updateData.size),
				color: updateData.color
			}
		} else {
			realData = {
				name: updateData.name,
				explanation: updateData.explanation,
				brand: updateData.brand,
				cost: updateData.cost,
				color: updateData.color
			}
		}

		const updateProduct = await this.prismaService.product.update({
			where: { productId: id },
			data: realData
		});
		
		return updateProduct;
	}
}
