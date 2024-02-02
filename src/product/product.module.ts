import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmExModule } from 'src/typeorm-setting/typeorm-ex.module';
import { ProductRepository } from './product.repository';
@Module({
  imports: [
    UsersModule,
    TypeOrmExModule.forCustomRepository([ProductRepository]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
