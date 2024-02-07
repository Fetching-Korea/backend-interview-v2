import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeEntity } from './entity/size.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
  ) {}

  async create(createSizeDto: CreateSizeDto) {
    const newSize = new SizeEntity();
    newSize.name = createSizeDto.name;
    newSize.description = createSizeDto.description;
    await this.sizeRepository.save(newSize);
    return;
  }

  async findAll() {
    const sizeList = await this.sizeRepository.find();

    return sizeList;
  }

  async remove(id: number) {
    await this.sizeRepository.softDelete(id);
    return `${id} size removed`;
  }
}
