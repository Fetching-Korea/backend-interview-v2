import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './items.controller';
import { ItemRepository } from "./item.repository";
import { ItemsService } from './items.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([ItemRepository]),
    ],
    controllers: [ItemsController],
    providers: [ItemsService]
})
export class ItemsModule {}
