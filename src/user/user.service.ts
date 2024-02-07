import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './user.dto';
import { PasswordBcryptEncrypt } from '../auth/password.bcrypt.encrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private passwordEncrypt: PasswordBcryptEncrypt,
  ) {}

  async signUp(signUpDto: UserSignUpDto) {
    const { uId, password, email } = signUpDto;
    const duplicateUser = await this.usersRepository.count({
      where: [
        {
          uId,
        },
        { email },
      ],
    });

    if (duplicateUser > 0) {
      throw new ConflictException('Already exist user id ');
    }

    const newUser = new UserEntity();
    newUser.uId = uId;
    newUser.password = await this.passwordEncrypt.encrypt(password);
    newUser.email = email;
    await this.usersRepository.save(newUser);

    return;
  }
}
