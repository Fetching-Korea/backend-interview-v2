import { EntityRepository, Repository } from "typeorm";
import { Item } from "./items.entity";
import { ItemStatus } from "./itemsStatus.enum";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item>{
    async createItem(createItemsDto): Promise<Item> {
        const { name, description, brand, price, size, color } = createItemsDto;

        const item = this.create({
            name,
            description,
            brand,
            price,
            size,
            color,
            status: ItemStatus.Active
        })

        await this.save(item);
        return item;
    }
}