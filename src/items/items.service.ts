import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemStatus } from './itemsStatus.enum';
import { CreateItemsDto } from './dto/create-items.dto';
import { ItemRepository } from "./item.repository";
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './items.entity';
import { Like } from 'typeorm';
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

    async getItemActiveAll(page : number, limit : number): Promise <Item[]> {
        return this.itemRepository.find({
            where: {status: ItemStatus.Active},
            skip: (page - 1) * limit,
            take: limit
        });
    }
    
    async getSearchedItems(search: string, page : number, limit : number): Promise<Item[]> {
        return this.itemRepository.find({
            where : [
                {name: Like(`%${search}%`)} ,
                {description: Like(`%${search}%`)} ,
                {brand: Like(`%${search}%`)} ,
                {color: Like(`%${search}%`)},
                {size: Like(`%${search}%`)}
            ],
            skip: (page - 1) * limit,
            take: limit
        });
    }

    async getFilteredItems(
            filterType: string = "",
            filterValue: string = "",
            page : number,
            limit : number
        ): Promise<Item[]> {
        switch(filterType) {
            case "brand":
                return this.itemRepository.find({
                    where: {brand: filterValue},
                    skip: (page - 1) * limit,
                    take: limit
                });
                break;
            case "color":
                return this.itemRepository.find({
                    where: {color: filterValue},
                    skip: (page - 1) * limit,
                    take: limit
                });
                break;
            case "size":
                return this.itemRepository.find({
                    where: {size: filterValue},
                    skip: (page - 1) * limit,
                    take: limit
                });
                break;
            default:
                throw new NotFoundException('Filter type not found');
        }
    }

    async getSortedItems(sortType: string , sortValue : boolean ,page : number, limit : number): Promise<Item[]> {
        const sortValueString = sortValue ? "DESC" : "ASC";
        switch(sortType) {
            case "price":
                return this.itemRepository.find({
                    order: {price: sortValueString},
                    skip: (page - 1) * limit,
                    take: limit,
                    where: {status: ItemStatus.Active}
                });
                break;
            case "name":
                return this.itemRepository.find({
                    order: {name: sortValueString},
                    skip: (page - 1) * limit,
                    take: limit,
                    where: {status: ItemStatus.Active}
                });
                break;
            case "datetime":
                return this.itemRepository.find({
                    order: {created_at: sortValueString},
                    skip: (page - 1) * limit,
                    take: limit,
                    where: {status: ItemStatus.Active}
                });
                break;
            case "reviews":
                return this.itemRepository.query(`
                    SELECT * FROM item WHERE status = 'active'
                    ORDER BY (SELECT COUNT(*) FROM review WHERE review."itemId" = item.id) ${sortValueString}
                    LIMIT ${limit} OFFSET ${(page - 1) * limit}
                `);
            default:
                throw new NotFoundException('Sort type not found');
        }
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
