import { IsOptional } from 'class-validator';

export class CreatePostImageDto {
    url: string;
    @IsOptional()
    postId?: number;
}
