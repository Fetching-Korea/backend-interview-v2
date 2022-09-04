import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from '../../repository/item.repositiory';
import { ConfigService } from '@nestjs/config';
import { Item } from '../../entities/item.entity';
import { CreateItemDTO } from '../../dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    private itemRepository: ItemRepository,
    private readonly config: ConfigService,
  ) {}

  getAll(): Promise<Item[]> {
    return this.itemRepository.findBy({ status: 'ACTIVE' });
  }

  //상품 생성
  async create(createData: CreateItemDTO) {
    const result = await this.itemRepository
      .createQueryBuilder()
      .insert()
      .into(Item)
      .values([
        {
          name: createData.name,
          description: createData.description,
          brand: createData.brand,
          price: createData.price,
          size: createData.size,
          color: createData.color,
        },
      ])
      .execute();
    return result;
  }

  //상세 조회
  async getOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOneBy({
      itemIdx: id,
      status: 'ACTIVE',
    });
    if (!item) throw new NotFoundException(`Item with ID ${id} not found.`);
    return item;
  }

  //상품 수정
  async update(id: number, updateData: CreateItemDTO) {
    await this.getOne(id);
    const updatedItem = await this.itemRepository
      .createQueryBuilder()
      .update(Item)
      .set({
        name: updateData.name,
        description: updateData.description,
        brand: updateData.brand,
        price: updateData.price,
        size: updateData.size,
        color: updateData.color,
      })
      .where({ itemIdx: id })
      .execute();
    return updatedItem;
  }

  async delete(id: number) {
    await this.getOne(id);
    const deleteItem = await this.itemRepository
      .createQueryBuilder()
      .update(Item)
      .set({
        status: 'DELETED',
      })
      .where({ itemIdx: id })
      .execute();
    return deleteItem;
  }
}
