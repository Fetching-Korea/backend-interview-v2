import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductInsertReqDto } from './dto/product-insert-req.dto';
import { typeormService } from '../../utils';
import { ProductEntity } from './product.entity';

export type User = any;

@Injectable()
export class ProductService {
  async insert(createReqDto: ProductInsertReqDto): Promise<User | undefined> {
    const { name } = createReqDto;

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
        ...createReqDto,
      }),
    );
  }

  async deleteOne(id: number): Promise<boolean | undefined> {
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
}
