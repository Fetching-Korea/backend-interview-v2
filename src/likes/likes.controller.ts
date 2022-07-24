import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';
import { LikesService } from './likes.service';
import { GetCurrentUser } from 'src/common/decorators';
import { Product } from 'src/products/entities/product.entity';

@Controller('likes')
export class LikesController {
	constructor(private readonly likeService: LikesService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createLike(@GetCurrentUser('userId') userId: number, @Body() likeData: CreateLikeDto): Promise<Like> {
		return this.likeService.createLike(likeData, userId);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getLikedProducts(@GetCurrentUser('userId') userId: number): Promise<Product[]> {
		return this.likeService.getLikedProducts(userId);
	}

	@Delete()
	@HttpCode(HttpStatus.OK)
	async cancelLike(@GetCurrentUser('userId') userId: number, @Query("productId") productId: number) {
		return this.likeService.cancelLike(userId, productId);
	}
}
