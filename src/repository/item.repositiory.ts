import { Item } from './../entities/item.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CustomRepository } from 'src/db/typeorm-ex.decorator';

@Injectable()
@CustomRepository(Item)
export class ItemRepository extends Repository<Item> {}
