import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product } from 'src/products/entities/product.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
	constructor(private prismaService: PrismaService){}

	async createLike(likeData: CreateLikeDto, userId: number): Promise<Like> {
		const like = await this.prismaService.like.create({
			data: {
				productId: likeData.productId,
				userId: userId
			}
		});

		return like;
	}

	async getLikedProducts(userId: number): Promise<Product[]> {
		let query = [];
		
		const productIds = await this.prismaService.like.findMany({
			where: { userId },
			select: { productId: true }
		});

		for (let i = 0; i < productIds.length; i++) {
			query.push(productIds[i].productId);
		}

		const products = await this.prismaService.product.findMany({
			where: { productId: { in: query },  }
		});

		return products;
	}
}
