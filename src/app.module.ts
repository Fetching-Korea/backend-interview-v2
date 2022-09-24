import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { typeOrmConfig } from './configs/typeorm.config';
import { ItemsModule } from './items/items.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ItemsModule,
    ReviewsModule,
    UsersModule
  ]
})
export class AppModule {}
