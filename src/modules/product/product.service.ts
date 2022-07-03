import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductUpdateReqDto } from './dto/product-update-req.dto';
import { typeormService } from '../../utils';
import { ProductEntity } from './product.entity';

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
}
