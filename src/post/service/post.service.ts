import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Post } from '@src/database/entity/post/post.entity';
import { User } from '@src/database/entity/user/user.entity';
import { RepositoryService } from '@src/database/service/repository.service';
import { DataSource } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostImageService } from './post-image.service';

@Injectable()
export class PostService extends RepositoryService<Post> {
    constructor(
        @Inject('DB_CONNECTION')
        private readonly db: DataSource,
        private readonly postImageService: PostImageService,
    ) {
        super(db, Post);
    }

    async create(user: User, dto: CreatePostDto) {
        const { imageUrls, ...postDto } = dto;
        const post: Post = { ...postDto, userId: user.id! };
        await this.repository.manager.transaction(async (manager) => {
            await manager.insert(Post, post);
            if (imageUrls) {
                for (const url of imageUrls) {
                    await this.postImageService.create(
                        { postId: post.id!, url },
                        manager,
                    );
                }
            }
        });
    }

    async update(user: User, id: number, dto: UpdatePostDto) {
        const target = await this.findMine(user, id);
        await this.repository.update(target.id!, dto);
    }

    async delete(user: User, id: number) {
        const target = await this.findMine(user, id);
        const postImages = await this.postImageService.findByPost(target);
        await this.repository.manager.transaction(async (manager) => {
            if (postImages.length) {
                for (const image of postImages) {
                    await this.postImageService.delete(image.id!, manager);
                }
            }
            await manager.delete(Post, target.id!);
        });
    }

    private async findMine(user: User, id: number) {
        const target = await this.repository.findOneByOrFail({ id });
        if (target.userId !== user.id)
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
        return target;
    }
}
