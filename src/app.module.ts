import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'Insanejam0220!',
        database: 'nest_shop', 
        entities: [User, Product, Order, Post],
        synchronize: true, 
        logging: true,
      }),
      UsersModule,
      ProductModule,
      OrderModule,
      PostModule,
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
