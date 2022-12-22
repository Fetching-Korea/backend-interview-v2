import { PickType } from '@nestjs/swagger';
import { PaginationDto } from '@src/common/dto/pagination.dto';
import { CommodityStatus } from '@src/database/entity/goods/commodity.entity';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

type GoodsOrder =
    | BasicOrder
    | 'title__asc'
    | 'title__desc'
    | 'company__asc'
    | 'company__desc'
    | 'size__asc'
    | 'size__desc'
    | 'color__asc'
    | 'color__desc'
    | 'price__asc'
    | 'price__desc';

export class FindGoodsDto extends PickType(PaginationDto, [
    'count',
    'page',
] as const) {
    @IsOptional()
    readonly title?: string;

    @IsOptional()
    readonly title__like?: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => +value)
    readonly price__gt?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => +value)
    readonly price__gte?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => +value)
    readonly price__lt?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => +value)
    readonly price__lte?: number;

    @IsOptional()
    readonly companyId?: number;

    @IsOptional()
    readonly company?: string;

    @IsOptional()
    readonly company__like?: string;

    @IsOptional()
    readonly status?: CommodityStatus;

    @IsOptional()
    @Transform(({ value }) => value.split(','))
    @IsString({ each: true })
    readonly order: GoodsOrder[] = ['id__desc'];
}
