import { CustomRepository } from 'src/typeorm-setting/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { nickname, email, password, address, gender, role } =
      authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.create({
      nickname,
      password: hashedPassword,
      email,
      gender,
      role,
      address: address || null,
    });
    console.log(newUser);
    try {
      return await this.save(newUser);
    } catch (err) {
      console.log(err);
      if (err.code === '23505') {
        throw new ConflictException('닉네임 또는 이메일이 이미 존재합니다.');
      } else {
        throw new InternalServerErrorException(err);
      }
    }
  }
}
