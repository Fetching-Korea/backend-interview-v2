import { Inject, Injectable } from '@nestjs/common';
import {
    Commodity,
    CommodityStatus,
} from '@src/database/entity/goods/commodity.entity';
import { RepositoryService } from '@src/database/service/repository.service';
import { DataSource } from 'typeorm';
import { CreateCommodityDto } from '../dto/create-commodity.dto';
import { UpdateCommodityDto } from '../dto/update-commodity.dto';

@Injectable()
export class CommodityService extends RepositoryService<Commodity> {
    constructor(
        @Inject('DB_CONNECTION')
        private readonly db: DataSource,
    ) {
        super(db, Commodity);
    }

    async create(dto: CreateCommodityDto) {
        const commodity: Commodity = {
            ...dto,
            status: CommodityStatus.READY,
        };
        return await this.repository.save(commodity);
    }

    async update(id: number, dto: UpdateCommodityDto) {
        const target = await this.repository.findOneByOrFail({ id });
        await this.repository.update(target.id!, { ...dto });
    }

    async delete(id: number) {
        const target = await this.repository.findOneByOrFail({ id });
        await this.repository.delete(target.id!);
    }
}
