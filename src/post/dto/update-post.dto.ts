import { IsOptional } from 'class-validator';

export class UpdatePostDto {
    @IsOptional()
    title?: string;

    @IsOptional()
    body?: string;
}
