import { Body, Injectable, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './.dto';
import { IsEmail } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    this.userRepository.save(createUserDto);
  }
  findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
