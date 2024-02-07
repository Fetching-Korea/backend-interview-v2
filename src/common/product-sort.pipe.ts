import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ProductSortType } from '../product/product-sort';

@Injectable()
export class ProductSortPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value && !ProductSortType.includes(value)) {
      throw new BadRequestException('sort type is wrong');
    }

    return value;
  }
}
