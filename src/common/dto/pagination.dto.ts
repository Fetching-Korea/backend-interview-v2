import { IsOptional } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    readonly count = 10;

    @IsOptional()
    readonly page = 1;
}

export class EdgeDto {
    readonly hasNextPage: boolean;
    readonly hasPreviousPage: boolean;
    readonly currentPage: number;
    readonly pageCount: number;
    readonly totalCount: number;
}
