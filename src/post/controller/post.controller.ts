import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { UseJwtAuthGuard } from '@src/auth/guard';
import { CurrentUser } from '@src/common/decorator/user.decorator';
import { MutationDto } from '@src/common/dto/mutation.dto';
import { User } from '@src/database/entity/user/user.entity';
import { CreatePostImageDto } from '../dto/create-post-image.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { FindPostDto } from '../dto/find-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostImageService } from '../service/post-image.service';
import { PostService } from '../service/post.service';

@UseJwtAuthGuard()
@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly postImageService: PostImageService,
    ) {}

    @Get()
    async find(@Query() dto: FindPostDto) {
        return await this.postService.findBy(dto, { images: true });
    }

    @UseJwtAuthGuard()
    @Post()
    async create(
        @CurrentUser() user: User,
        @Body() dto: CreatePostDto,
    ): Promise<MutationDto> {
        await this.postService.create(user, dto);
        return { status: HttpStatus.CREATED };
    }

    @Put(':id')
    async update(
        @CurrentUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdatePostDto,
    ): Promise<MutationDto> {
        await this.postService.update(user, id, dto);
        return { status: HttpStatus.OK };
    }

    @Delete(':id')
    async delete(
        @CurrentUser() user: User,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<MutationDto> {
        await this.postService.delete(user, id);
        return { status: HttpStatus.OK };
    }

    @Post(':id/image')
    async createImage(
        @CurrentUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreatePostImageDto,
    ) {
        await this.postImageService.create(dto);
    }

    @Delete('image/:id')
    async deleteImage(
        @CurrentUser() user: User,
        @Param('id') imageId: string,
    ): Promise<MutationDto> {
        await this.postImageService.delete(imageId);
        return { status: HttpStatus.OK };
    }
}
