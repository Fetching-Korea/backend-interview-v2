import { BadRequestException, Injectable } from '@nestjs/common';
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
}
