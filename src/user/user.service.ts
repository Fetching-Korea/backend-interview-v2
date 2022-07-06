import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { UserReturnType } from './dto/returnType.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async register(inputs: RegisterDto): Promise<UserReturnType> {
    const { username, password } = inputs;
    const alreadyExists = await this.userRepository.findOne({
        where: {
            username
        }
    });
    if (alreadyExists) return {
        error: {
            field: 'username',
            message: '해당 아이디가 이미 존재합니다.'
        }
    };

    const hashedPw = await argon2.hash(password);
    if (!hashedPw) throw new InternalServerErrorException;

    const user = new User();
    user.username = username;
    user.password = hashedPw;
    await this.userRepository.save(user);

    user.password = '';
    return { user };
  }
}
