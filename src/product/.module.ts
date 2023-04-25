import { Module } from '@nestjs/common';
import { ProductController } from './.controller';
import { ProductService } from './.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
