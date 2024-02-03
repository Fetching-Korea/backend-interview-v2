import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmExModule } from 'src/typeorm-setting/typeorm-ex.module';
import { ProductRepository } from './product.repository';
import { ProductOptionRepository } from 'src/product-option/product-option.repository';
import { ProductOptionModule } from 'src/product-option/product-option.module';
@Module({
  imports: [
    UsersModule,
    ProductOptionModule,
    TypeOrmExModule.forCustomRepository([
      ProductRepository,
      ProductOptionRepository,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
