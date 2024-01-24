import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id
      }
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
