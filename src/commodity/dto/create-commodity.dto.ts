import { IsNumber } from 'class-validator';

export class CreateCommodityDto {
    readonly title: string;
    readonly description: string;
    readonly company: string;
    readonly size: string;
    readonly color: string;
    @IsNumber()
    readonly price: number;
}
