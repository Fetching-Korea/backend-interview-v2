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
    
    async getItemById(id: number): Promise <{statusCode:string, contents:Item}> {
        const found = await this.itemRepository.findOne({where: {id}});

        if(!found)
            throw new NotFoundException('Item not found');
        return {statusCode: "200", contents: found};
    }

    async getItemAll(): Promise <{statusCode:string, contents:Item[]}> {
        return {statusCode: "200", contents: await this.itemRepository.find()};
    }

    async getItemActiveAll(page : number, limit : number): Promise <{statusCode:string, contents:Item[]}> {
        const found = await this.itemRepository.find({
            where: {status: ItemStatus.Active},
            skip: (page - 1) * limit,
            take: limit
        });
        return {statusCode: "200", contents: found};
    }
    
    async getSearchedItems(search: string, page : number, limit : number): Promise<{statusCode:string, contents:Item[]}> {
        const found = await this.itemRepository.find({
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
        return {statusCode: "200", contents: found};
    }

    async getFilteredItems(
            filterType: string = "",
            filterValue: string = "",
            page : number,
            limit : number
        ): Promise<{statusCode:string, contents:Item[]}> {
            let found;
        switch(filterType) {
            case "brand":
                found = await this.itemRepository.find({
                    where: {brand: filterValue},
                    skip: (page - 1) * limit,
                    take: limit
                });
                return {statusCode: "200", contents: found};
            case "color":
                found = await this.itemRepository.find({
                    where: {color: filterValue},
                    skip: (page - 1) * limit,
                    take: limit
                });
                return {statusCode: "200", contents: found};
            case "size":
                found = await this.itemRepository.find({
                    where: {size: filterValue},
                    skip: (page - 1) * limit,
                    take: limit
                });
                return {statusCode: "200", contents: found};
            default:
                throw new NotFoundException('Filter type not found');
        }
    }

    async getSortedItems(sortType: string , sortValue : boolean ,page : number, limit : number): Promise<{statusCode:string, contents:Item[]}> {
        const sortValueString = sortValue ? "DESC" : "ASC";
        let found;
        switch(sortType) {
            case "price":
                found = await this.itemRepository.find({
                    order: {price: sortValueString},
                    skip: (page - 1) * limit,
                    take: limit,
                    where: {status: ItemStatus.Active}
                });
                return {statusCode: "200", contents: found};
            case "name":
                found = await this.itemRepository.find({
                    order: {name: sortValueString},
                    skip: (page - 1) * limit,
                    take: limit,
                    where: {status: ItemStatus.Active}
                });
                return {statusCode: "200", contents: found};
            case "datetime":
                found = await this.itemRepository.find({
                    order: {created_at: sortValueString},
                    skip: (page - 1) * limit,
                    take: limit,
                    where: {status: ItemStatus.Active}
                });
                return {statusCode: "200", contents: found};
            case "reviews":
                found = await this.itemRepository.query(`
                    SELECT * FROM item WHERE status = 'active'
                    ORDER BY (SELECT COUNT(*) FROM review WHERE review."itemId" = item.id) ${sortValueString}
                    LIMIT ${limit} OFFSET ${(page - 1) * limit}
                `);
                return {statusCode: "200", contents: found};
            default:
                throw new NotFoundException('Sort type not found');
        }
    }

    async createItem(createItemsDto: CreateItemsDto): Promise<{statusCode:string, contents:Item}> {
        return this.itemRepository.createItem(createItemsDto);
    }

    async updateItem(id: number, createItemsDto: CreateItemsDto): Promise<{statusCode:string, contents:Item}> {
        const item = await (await this.getItemById(id)).contents;
        const { name, description, brand, price, size, color } = createItemsDto;

        item.name = name ? name : item.name;
        item.description = description ? description : item.description;
        item.brand = brand ? brand : item.brand;
        item.price = price ? price : item.price;
        item.size = size ? size : item.size;
        item.color = color ? color : item.color;
        await this.itemRepository.save(item);
        return {statusCode: "200", contents: item};
    }

    async deleteItem(id: number): Promise<{statusCode:string}> {
        const result = await this.itemRepository.delete(id);
        if(result.affected === 0)
            throw new NotFoundException('Item not found');
        return {statusCode: "200"};
    }

    async updateItemStatus(id: number, status: ItemStatus): Promise<{statusCode:string}> {
        const item = await (await this.getItemById(id)).contents;
        item.status = status;
        await this.itemRepository.save(item);
        return {statusCode: "200"};
    }
}
