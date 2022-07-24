import { Controller, Post, HttpCode, HttpStatus, Body, Get, Delete, Query } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { GetCurrentUser } from 'src/common/decorators';
import { Collection } from './entities/collection.entity';
import { Product } from 'src/products/entities/product.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Controller('purchase')
export class PurchaseController {
	constructor(private readonly purchaseService: PurchaseService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async purchase(@GetCurrentUser('userId') userId: number, @Body() collectionData: CreateCollectionDto): Promise<Collection> {
		return this.purchaseService.purchase(userId, collectionData);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getPurchasedProducts(@GetCurrentUser('userId') userId: number): Promise<Product[]> {
		return this.purchaseService.getPurchasedProducts(userId);
	}

	@Delete()
	@HttpCode(HttpStatus.OK)
	async cancelPurchase(@GetCurrentUser('userId') userId: number, @Query("productId") productId: number) {
		return this.purchaseService.cancelPurchase(userId, productId);
	}
}
