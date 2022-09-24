import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateItemsDto } from './dto/create-items.dto';
import { ItemStatus } from './itemsStatus.enum';
import { ItemsService } from './items.service';
import { Item } from './items.entity';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {
    }
    @Get()
    getItemActiveAll(): Promise<Item[]> {
        return this.itemsService.getItemActiveAll();
    }

    @Get('/all')
    getItemAll(): Promise<Item[]> {
        return this.itemsService.getItemAll();
    }

    @Get('/:id')
    getItemById(@Param('id') id: number): Promise<Item> {
        const found = this.itemsService.getItemById(id);
        return found;
    }

    @Post()
    @UsePipes(ValidationPipe)
    createItem(@Body() createItemsDto: CreateItemsDto): Promise<Item> {
        return this.itemsService.createItem(createItemsDto);
    }

    @Post('/:id')
    updateItem(@Param('id') id: number, @Body() createItemsDto: CreateItemsDto): Promise<Item> {
        return this.itemsService.updateItem(id, createItemsDto);
    }

    @Post('/:id/softdelete')
    deleteSoft(@Param('id') id: number): Promise<void> {
        return this.itemsService.updateItemStatus(id, ItemStatus.Delete);
    }

    @Post('/:id/harddelete')
    deleteHard(@Param('id') id: number): Promise<void> {
        return this.itemsService.deleteItem(id);
    }
}
