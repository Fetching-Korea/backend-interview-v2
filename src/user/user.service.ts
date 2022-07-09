import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { PayloadDto } from 'src/utils/payload.dto';

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

  async findByUserId(userId: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async register(inputs: RegisterDto): Promise<User> {
    const { username, password } = inputs;
    const alreadyExists = await this.userRepository.findOne({
        where: {
            username
        }
    });
    if (alreadyExists) throw new BadRequestException('해당 아이디가 이미 존재합니다')

    const hashedPw = await argon2.hash(password);
    if (!hashedPw) throw new InternalServerErrorException;

    const user = new User();
    user.username = username;
    user.password = hashedPw;
    await this.userRepository.save(user);

    user.password = '';
    return user;
  }

  async isAdmin(payload: PayloadDto) {
    const user = await this.findUserWithPayload(payload);
    if (!user || user.admin) throw new UnauthorizedException();
  }

  async findUserWithPayload(payload: PayloadDto): Promise<User> {
    if (!payload) throw new UnauthorizedException();
    const { userId } = payload;
    return await this.findByUserId(userId);
  }
}
