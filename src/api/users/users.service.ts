import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { InsertResult, Repository } from 'typeorm';
import { UserRepository } from '../../repository/user.repository';
import { User } from '../../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO } from '../../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private readonly config: ConfigService,
  ) {}
  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async transformPassword(user: CreateUserDTO): Promise<void> {
    user.pw = await bcrypt.hash(user.pw, 10);
    return Promise.resolve();
  }

  async create(userData: CreateUserDTO): Promise<InsertResult> {
    const temp = await this.userRepository.findOneBy({ id: userData.id });
    if (temp) throw new UnauthorizedException('이미 존재하는 아이디입니다.');
    await this.transformPassword(userData);
    const result = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ id: userData.id, pw: userData.pw, name: userData.name }])
      .execute();
    return result;
  }
}
