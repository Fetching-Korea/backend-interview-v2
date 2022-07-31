import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { UserInfo } from './userInfo';

const saltRound = 3;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(userName: string, password: string, displayName: string) {
    const userExists = await this.checkUserExists(userName);
    if (userExists) {
      throw new NotFoundException('This id has already been');
    }
    const id = uuid.v4();
    const hashedPassword = bcrypt.hashSync(password, saltRound);

    const user = new User();
    user.id = id;
    user.userName = userName;
    user.hashedPassword = hashedPassword;
    user.displayName = displayName;

    await this.usersRepository.save(user);
  }

  private async checkUserExists(userName: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { userName },
    });

    return user !== undefined;
  }

  async login(userName: string, password: string): Promise<string> {
    const user = await this.usersRepository.findOne({ userName });
    if (user === undefined) {
      throw new BadRequestException('This id does not exist');
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Password is not correct');
    }

    return this.authService.sign({ id: user.id, userName: user.userName });
  }

  async getUserInfo(userName: string): Promise<UserInfo> {
    const user = await this.usersRepository.findOne({ where: { userName } });

    if (!user) {
      throw new NotFoundException('This user does not exist');
    }

    return {
      id: user.id,
      userName: user.userName,
      displayName: user.displayName,
    };
  }
}
