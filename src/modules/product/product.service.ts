import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ProductUpdateReqDto } from './dto/product-update-req.dto';
import { typeormService } from '../../utils';
import {
  EnumColors,
  EnumOrderBy,
  EnumSizes,
  ProductEntity,
} from './product.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { ProductListResDto } from './dto/product-list-res.dto';

@Injectable()
export class ProductService {
  async insert(
    productUpdateReqDto: ProductUpdateReqDto,
  ): Promise<ProductEntity> {
    const { name } = productUpdateReqDto;

    const existedProduct = await typeormService.source
      .getRepository(ProductEntity)
      .findOne({
        where: {
          name,
        },
      });

    if (existedProduct) {
      throw new BadRequestException('Product already existed.');
    }

    return await typeormService.source.getRepository(ProductEntity).save(
      new ProductEntity({
        ...productUpdateReqDto,
      }),
    );
  }

  async deleteOne(id: number): Promise<boolean> {
    const foundProduct = await typeormService.source
      .getRepository(ProductEntity)
      .findOne({
        where: {
          id,
        },
      });

    if (!foundProduct) {
      throw new NotFoundException('Product not found.');
    }

    return !!(await typeormService.source
      .getRepository(ProductEntity)
      .delete(id));
  }

  async update(
    id: number,
    productUpdateReqDto: ProductUpdateReqDto,
  ): Promise<ProductEntity> {
    const foundProduct = await typeormService.source
      .getRepository(ProductEntity)
      .findOne({
        where: {
          id,
        },
      });

    if (!foundProduct) {
      throw new NotFoundException('Product not found.');
    }

    foundProduct.name = productUpdateReqDto.name;
    foundProduct.description = productUpdateReqDto.description;
    foundProduct.brand = productUpdateReqDto.brand;
    foundProduct.price = productUpdateReqDto.price;
    foundProduct.size = productUpdateReqDto.size;
    foundProduct.color = productUpdateReqDto.color;

    return await typeormService.source
      .getRepository(ProductEntity)
      .save(foundProduct);
  }

  async findOne(id: number): Promise<ProductEntity> {
    const foundProduct = await typeormService.source
      .getRepository(ProductEntity)
      .findOne({
        where: {
          id,
        },
      });

    if (!foundProduct) {
      throw new NotFoundException('Product not found.');
    }

    return foundProduct;
  }

  async listProducts(
    pageNumber: number,
    pageSize: number,
    brandFilter: string,
    sizeFilter: EnumSizes,
    colorFilter: EnumColors,
    orderBy: string[],
  ): Promise<ProductListResDto> {
    const findManyOptions: FindManyOptions = {
      where: [],
      order: {},
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    };

    if (brandFilter) findManyOptions.where.push({ brand: brandFilter });
    if (sizeFilter) findManyOptions.where.push({ size: sizeFilter });
    if (colorFilter) findManyOptions.where.push({ color: colorFilter });
    if (!findManyOptions.where.length) delete findManyOptions.where;

    for (const key in orderBy) {
      Logger.warn(orderBy[key]);
      switch (EnumOrderBy[orderBy[key]]) {
        case EnumOrderBy.NAME_ASC:
          findManyOptions.order.name = 'ASC';
          break;
        case EnumOrderBy.NAME_DESC:
          findManyOptions.order.name = 'DESC';
          break;
        case EnumOrderBy.BRAND_ASC:
          findManyOptions.order.brand = 'ASC';
          break;
        case EnumOrderBy.BRAND_DESC:
          findManyOptions.order.brand = 'DESC';
          break;
        case EnumOrderBy.PRICE_ASC:
          findManyOptions.order.price = 'ASC';
          break;
        case EnumOrderBy.PRICE_DESC:
          findManyOptions.order.price = 'DESC';
          break;
        case EnumOrderBy.SIZE_ASC:
          findManyOptions.order.size = 'ASC';
          break;
        case EnumOrderBy.SIZE_DESC:
          findManyOptions.order.size = 'DESC';
          break;
      }
    }

    Logger.warn(orderBy);
    Logger.warn(findManyOptions.order.price);

    const [foundProducts, count] = await typeormService.source
      .getRepository(ProductEntity)
      .findAndCount(findManyOptions);

    return <ProductListResDto>{
      list: foundProducts,
      count: count,
    };
  }
}
