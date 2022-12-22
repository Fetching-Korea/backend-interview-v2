import { CommodityStatus } from '@src/database/entity/goods/commodity.entity';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCommodityDto {
    @IsOptional()
    readonly title?: string;
    @IsOptional()
    readonly description?: string;
    @IsOptional()
    readonly company?: string;
    @IsOptional()
    readonly size?: string;
    @IsOptional()
    readonly color?: string;
    @IsOptional()
    @IsNumber()
    readonly price?: number;
    @IsOptional()
    readonly status?: CommodityStatus;
}
