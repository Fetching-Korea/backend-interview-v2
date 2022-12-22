import { Inject, Injectable } from '@nestjs/common';
import { PostImage } from '@src/database/entity/post/post-image.entity';
import { Post } from '@src/database/entity/post/post.entity';
import { RepositoryService } from '@src/database/service/repository.service';
import { DataSource, EntityManager } from 'typeorm';
import { CreatePostImageDto } from '../dto/create-post-image.dto';

@Injectable()
export class PostImageService extends RepositoryService<PostImage> {
    constructor(
        @Inject('DB_CONNECTION')
        private readonly db: DataSource,
    ) {
        super(db, PostImage);
    }

    async create(dto: CreatePostImageDto, manager?: EntityManager) {
        const image: PostImage = { ...dto, postId: dto.postId! };
        if (!manager) return this.repository.save(image);
        return await manager.save(PostImage, image);
    }

    async findByPost(post: Post) {
        return await this.repository.findBy({ postId: post.id! });
    }

    async delete(id: string, manager?: EntityManager) {
        if (!manager) return this.repository.delete(id);
        await manager.delete(PostImage, id);
    }
}
