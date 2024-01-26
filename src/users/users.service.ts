import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
  private userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // order 볼때랑 아닐때 구분해서 ㄱㄱㄱ
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id
      }, relations:['orders']
    });
  }

  async update(id: number, user: UpdateUserDto): Promise<number> {
    await this.userRepository.update(id, user);
    return id
  }

  async remove(id: number): Promise<number> {
    await this.userRepository.delete(id);
    return id
  }
}
