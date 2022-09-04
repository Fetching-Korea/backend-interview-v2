import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemRepository } from '../../repository/item.repositiory';
import { TypeOrmExModule } from '../../db/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ItemRepository])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
