import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorEntity } from './entity/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private colorRepository: Repository<ColorEntity>,
  ) {}
  async create(createColorDto: CreateColorDto) {
    const newColor = new ColorEntity();
    newColor.name = createColorDto.name;
    newColor.code = createColorDto.code;
    await this.colorRepository.save(newColor);
    return;
  }

  async findAll() {
    const colorList = await this.colorRepository.find();

    return colorList;
  }

  async remove(id: number) {
    await this.colorRepository.softDelete(id);
    return `${id} color removed`;
  }
}
