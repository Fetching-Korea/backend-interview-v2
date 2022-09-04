import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDTO } from '../../dto/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getAll() {
    return this.itemsService.getAll();
  }

  @Post()
  create(@Body() createData: CreateItemDTO) {
    return this.itemsService.create(createData);
  }

  //상세 조회
  @Get('/:id')
  getDetail(@Param('id') id: number) {
    return this.itemsService.getOne(id);
  }

  // 수정
  @Patch('/:id')
  updateItem(@Param('id') id: number, @Body() updateData: CreateItemDTO) {
    return this.itemsService.update(id, updateData);
  }

  @Delete('/:id')
  deleteItem(@Param('id') id: number) {
    return this.itemsService.delete(id);
  }
}
