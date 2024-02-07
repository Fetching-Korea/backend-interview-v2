import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsEntity } from './entity/goods.entity';
import { ProductEntity } from '../product/entity/product.entity';
import { ColorEntity } from './entity/color.entity';
import { SizeEntity } from './entity/size.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
    @InjectRepository(ProductEntity)
    private productEntityRepository: Repository<ProductEntity>,
    @InjectRepository(ColorEntity)
    private colorRepository: Repository<ColorEntity>,
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
  ) {}

  async findAllByProductId(productId: number) {
    const goodsList = await this.goodsRepository.find({
      where: {
        productId,
      },
      relations: ['color', 'size'],
    });
    return goodsList;
  }

  async create(createGoodDto: CreateGoodDto) {
    const { sizeId, colorId, productId } = createGoodDto;
    const size = await this.sizeRepository.findOne({
      where: {
        id: sizeId,
      },
    });
    if (!size) {
      throw new Error('size is not exist');
    }

    const color = await this.colorRepository.findOne({
      where: {
        id: colorId,
      },
    });
    if (!color) {
      throw new Error('color is not exist');
    }

    const product = await this.productEntityRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('product is not exist');
    }

    const newGoods = new GoodsEntity();
    newGoods.sizeId = sizeId;
    newGoods.colorId = colorId;
    newGoods.productId = productId;

    await this.goodsRepository.save(newGoods);
    return;
  }

  async remove(id: number) {
    await this.goodsRepository.softDelete(id);
    return `${id} goods removed`;
  }
}
