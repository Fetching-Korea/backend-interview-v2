import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto, UserSignUpDto } from './user.dto';
import { PasswordBcryptEncrypt } from '../auth/password.bcrypt.encrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private passwordEncrypt: PasswordBcryptEncrypt,
    private jwtService: JwtService,
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

  async login(loginDto: UserLoginDto) {
    const { uId, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { uId } });
    if (!user) {
      throw new NotFoundException('user not exist');
    }
    const isPasswordMatch = await this.passwordEncrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new ForbiddenException('password not match');
    }
    const payload = { id: user.id, uId, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
