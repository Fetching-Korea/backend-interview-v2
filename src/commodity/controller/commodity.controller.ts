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
import { GrantAuth } from '@src/auth/guard';
import { MutationDto } from '@src/common/dto/mutation.dto';
import { UserTier } from '@src/database/entity/user/user.entity';
import { CreateCommodityDto } from '../dto/create-commodity.dto';
import { FindGoodsDto } from '../dto/find-commodity.dto';
import { UpdateCommodityDto } from '../dto/update-commodity.dto';
import { CommodityService } from '../service/commodity.service';

@Controller('commodity')
export class CommodityController {
    constructor(private readonly commodityService: CommodityService) {}

    @Get()
    async find(@Query() dto: FindGoodsDto) {
        return await this.commodityService.findBy(dto);
    }

    @GrantAuth(UserTier.ADMIN)
    @Post()
    async create(@Body() dto: CreateCommodityDto): Promise<MutationDto> {
        await this.commodityService.create(dto);
        return { status: HttpStatus.CREATED };
    }

    @GrantAuth(UserTier.ADMIN)
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCommodityDto,
    ): Promise<MutationDto> {
        await this.commodityService.update(id, dto);
        return { status: HttpStatus.OK };
    }

    @GrantAuth(UserTier.ADMIN)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<MutationDto> {
        await this.commodityService.delete(id);
        return { status: HttpStatus.OK };
    }
}
