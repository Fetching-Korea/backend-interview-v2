import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
    title: string;
    body: string;
    @IsNumber()
    commodityId: number;
    @IsString({ each: true })
    @IsOptional()
    imageUrls?: string[];
}
