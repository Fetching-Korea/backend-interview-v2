import { Module } from '@nestjs/common';
import { CommodityController } from './controller/commodity.controller';
import { CommodityService } from './service/commodity.service';

@Module({
    controllers: [CommodityController],
    providers: [{ provide: CommodityService, useClass: CommodityService }],
})
export class CommodityModule {}
