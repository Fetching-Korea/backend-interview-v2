import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product } from 'src/products/entities/product.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { Collection } from './entities/collection.entity';

@Injectable()
export class PurchaseService {
	constructor(private prismaService: PrismaService){}

	async purchase(userId: number, collectionData: CreateCollectionDto): Promise<Collection> {
		const collectionExist = await this.prismaService.collection.findFirst({
			where: { userId, productId: collectionData.productId }
		});

		if (collectionExist) {
			return collectionExist;
		}
		
		const collection = await this.prismaService.collection.create({
			data: {
				productId: collectionData.productId,
				userId: userId
			}
		});

		return collection;
	}

	async getPurchasedProducts(userId: number): Promise<Product[]> {
		let query = [];

		const productIds = await this.prismaService.collection.findMany({
			where: { userId },
			select: { productId: true }
		});

		for (let i = 0; i < productIds.length; i++) {
			query.push(productIds[i].productId);
		}

		const products = await this.prismaService.product.findMany({
			where: { productId: { in: query } }
		});

		return products;
	}

	async cancelPurchase(userId: number, productId: number) {
		if (!productId) {
			throw new ForbiddenException('You need productId to execute deletion.');
		}
		const collection = await this.prismaService.collection.findFirst({
			where: { userId, productId }
		});

		if (!collection) {
			throw new NotFoundException("collection not found.");
		}

		await this.prismaService.collection.delete({
			where: {
				userId_productId: {
					userId: userId,
					productId: productId
				}
			}
		});
	}
}
