import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { Good } from './entities/good.entity';
import { GoodsInfo } from './goodsInfo';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post('create')
  async create(@Body() createGoodDto: CreateGoodDto): Promise<void> {
    return this.goodsService.create(createGoodDto);
  }

  @Get()
  async getAll(): Promise<Good[]> {
    return this.goodsService.goodsList();
  }

  @Get('search')
  async findBySearch(@Query() query) {
    return this.goodsService.findGoods(query);
  }

  @Get(':id')
  async goodsInfo(@Param('id') id: string): Promise<GoodsInfo> {
    return this.goodsService.goodsInfo(id);
  }

  @Patch(':id')
  async modifyGoods(
    @Param('id') id: string,
    @Body() goods: CreateGoodDto,
  ): Promise<void> {
    return this.goodsService.updateGoods(id, goods);
  }

  @Delete(':id')
  async removeGoods(@Param('id') id: string): Promise<void> {
    return this.goodsService.removeGoods(id);
  }
}
