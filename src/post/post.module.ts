import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostImageService } from './service/post-image.service';
import { PostService } from './service/post.service';

@Module({
    controllers: [PostController],
    providers: [
        { provide: PostService, useClass: PostService },
        { provide: PostImageService, useClass: PostImageService },
    ],
})
export class PostModule {}
