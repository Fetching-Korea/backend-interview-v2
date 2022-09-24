import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemStatus } from './itemsStatus.enum';
import { CreateItemsDto } from './dto/create-items.dto';
import { ItemRepository } from "./item.repository";
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './items.entity';
@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ItemRepository)
        private itemRepository: ItemRepository
    ) {}
    
    async getItemById(id: number): Promise <Item> {
        const found = await this.itemRepository.findOne({where: {id}});

        if(!found)
            throw new NotFoundException('Item not found');
        return found;
    }

    async getItemAll(): Promise <Item[]> {
        return this.itemRepository.find();
    }

    async getItemActiveAll(): Promise <Item[]> {
        return this.itemRepository.find({where: {status: ItemStatus.Active}});
    }

    async createItem(createItemsDto: CreateItemsDto): Promise<Item> {

        return this.itemRepository.createItem(createItemsDto);
    }

    async updateItem(id: number, createItemsDto: CreateItemsDto): Promise<Item> {
        const item = await this.getItemById(id);
        const { name, description, brand, price, size, color } = createItemsDto;

        item.name = name ? name : item.name;
        item.description = description ? description : item.description;
        item.brand = brand ? brand : item.brand;
        item.price = price ? price : item.price;
        item.size = size ? size : item.size;
        item.color = color ? color : item.color;
        await this.itemRepository.save(item);
        return item;
    }

    async deleteItem(id: number): Promise<void> {
        const result = await this.itemRepository.delete(id);
        if(result.affected === 0)
            throw new NotFoundException('Item not found');
    }

    async updateItemStatus(id: number, status: ItemStatus): Promise<void> {
        const item = await this.getItemById(id);
        item.status = status;
        await this.itemRepository.save(item);
    }
}
