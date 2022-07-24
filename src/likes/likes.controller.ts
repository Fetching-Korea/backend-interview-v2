import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
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
}
