import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import * as config from 'config';
import { Product } from 'src/product/product.entity';
import { Review } from 'src/review/review.entity';
import { ProductOption } from 'src/product-option/product-option.entity';
import { Like } from 'src/like/like.entity';
import { CartItem } from 'src/cart-item/cart-item.entity';
import { Cart } from 'src/cart/cart.entity';

const dbConfig = config.get('db');
export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [
    __dirname + '/../**/*.entity.{js,ts}',
    User,
    Product,
    ProductOption,
    Review,
    Like,
    CartItem,
    Cart,
  ],
  synchronize: true,
};
