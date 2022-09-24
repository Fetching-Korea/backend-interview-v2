import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateItemsDto } from './dto/create-items.dto';
import { ItemStatus } from './itemsStatus.enum';
import { ItemsService } from './items.service';
import { Item } from './items.entity';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {
    }
    @Get()
    getItemActiveAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<{statusCode:string, contents:Item[]}> {
        limit = limit > 100 ? 100 : limit;
        return this.itemsService.getItemActiveAll(page, limit);
    }

    @Get('/all')
    getItemAll(): Promise<{statusCode:string, contents:Item[]}> {
        return this.itemsService.getItemAll();
    }

    @Get('/search/:search')
    getSearchedItems(
            @Param('search') search: string,
            @Query('page') page: number = 1,
            @Query('limit') limit: number = 10
        ): Promise<{statusCode:string, contents:Item[]}> {
        if(search == "")
            throw new NotFoundException('Search keyword is empty');
        return this.itemsService.getSearchedItems(search, page, limit);
    }

    @Get('id/:id')
    getItemById(
            @Param('id') id: number
        ): Promise<{statusCode:string, contents:Item}> {
        const found = this.itemsService.getItemById(id);
        return found;
    }

    @Get('/filtered')
    getFilteredItems(
            @Query('type') filterType: string, 
            @Query('value') filterValue: string,
            @Query('page') page: number = 1,
            @Query('limit') limit: number = 10
        ): Promise<{statusCode:string, contents:Item[]}> {
        if(filterType == "")
            throw new NotFoundException('Filter type is empty');
        if(filterValue == "")
            throw new NotFoundException('Filter value is empty');
        return this.itemsService.getFilteredItems(filterType, filterValue, page, limit);
    }

    @Get('/sort')
    getSortedItems(
            @Query('type') sortType: string, 
            @Query('value') sortValue: boolean = true,
            @Query('page') page: number = 1,
            @Query('limit') limit: number = 10
        ): Promise<{statusCode:string, contents:Item[]}> {
        if(sortType == "")
            throw new NotFoundException('Sort type is empty');
        return this.itemsService.getSortedItems(sortType, sortValue, page, limit);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createItem(@Body() createItemsDto: CreateItemsDto): Promise<{statusCode:string, contents:Item}> {
        return this.itemsService.createItem(createItemsDto);
    }

    @Post('/:id')
    updateItem(@Param('id') id: number, @Body() createItemsDto: CreateItemsDto): Promise<{statusCode:string, contents:Item}> {
        return this.itemsService.updateItem(id, createItemsDto);
    }

    @Post('/:id/softdelete')
    deleteSoft(@Param('id') id: number): Promise<{statusCode:string}> {
        return this.itemsService.updateItemStatus(id, ItemStatus.Delete);
    }

    @Post('/:id/harddelete')
    deleteHard(@Param('id') id: number): Promise<{statusCode:string}> {
        return this.itemsService.deleteItem(id);
    }
}
