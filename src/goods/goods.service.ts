import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as uuid from 'uuid';
import { CreateGoodDto } from './dto/create-good.dto';
import { Good } from './entities/good.entity';
import { GoodsInfo } from './goodsInfo';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Good) private goodsRepository: Repository<Good>,
  ) {}

  async create(goods: CreateGoodDto) {
    const id = uuid.v4();

    const newGoods = new Good(
      id,
      goods.name,
      goods.description,
      goods.brand,
      goods.price,
      goods.size,
      goods.color,
    );

    console.log(newGoods);
    await this.goodsRepository.save(newGoods);
  }

  async goodsList() {
    return await this.goodsRepository.find();
  }

  async goodsInfo(id: string) {
    const goods = await this.goodsRepository.findOne({ where: { id } });
    if (!goods) {
      throw new BadRequestException('This goods does not exist');
    }

    return new GoodsInfo(
      goods.id,
      goods.name,
      goods.description,
      goods.brand,
      goods.price,
      goods.size,
      goods.color,
    );
  }

  async findGoods(query: { [key: string]: string }): Promise<Good[]> {
    if (query['brand'] !== undefined) {
      return await this.goodsRepository.find({
        where: { brand: query['brand'] },
      });
    } else if (query['name'] !== undefined) {
      return await this.goodsRepository.find({
        where: {
          name: Like(`%${query['name']}%`),
        },
      });
    } else if (query['color'] !== undefined) {
      return await this.goodsRepository.find({
        where: { color: query['color'] },
      });
    } else {
      throw new BadRequestException('Search Query is wrong');
    }
  }

  async sortGoods(sortby: string): Promise<Good[]> {
    if (sortby === 'name') {
      return await this.goodsRepository.find({
        order: {
          name: 'ASC',
        },
      });
    } else if (sortby === 'price') {
      return await this.goodsRepository.find({
        order: {
          price: 'ASC',
        },
      });
    } else if (sortby === 'size') {
      return await this.goodsRepository.find({
        order: {
          size: 'ASC',
        },
      });
    } else {
      throw new BadRequestException('Cannot sort by this keyword');
    }
  }

  async updateGoods(id: string, goods: CreateGoodDto) {
    const newGoods = await this.goodsRepository.findOne({
      where: { id },
    });
    if (!newGoods) {
      throw new BadRequestException('This goods does not exist');
    }

    newGoods.name = goods.name;
    newGoods.description = goods.description;
    newGoods.brand = goods.brand;
    newGoods.price = goods.price;
    newGoods.size = goods.size;
    newGoods.color = goods.color;

    await this.goodsRepository.save(newGoods);
  }

  async removeGoods(id: string) {
    const goods = this.goodsRepository.findOne({ where: { id } });
    if (!goods) {
      throw new BadRequestException('This goods does not exist');
    }
    await this.goodsRepository.delete({ id });
  }
}
