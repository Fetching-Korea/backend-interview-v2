import { CustomRepository } from 'src/typeorm-setting/typeorm-ex.decorator';
import { ProductOption } from './product-option.entity';
import { Repository } from 'typeorm';

@CustomRepository(ProductOption)
export class ProductOptionRepository extends Repository<ProductOption> {}
