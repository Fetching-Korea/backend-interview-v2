import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { UserCreateReqDto } from './dto/user-create-req.dto';
import { typeormService } from '../../utils';

import { UserEntity } from './user.entity';
import { digestPassword } from '../../utils';

export type User = any;

@Injectable()
export class UserService {
  async insert(userCreateReqDto: UserCreateReqDto): Promise<User | undefined> {
    const { email } = userCreateReqDto;

    const existedUser = await typeormService.source
      .getRepository(UserEntity)
      .findOne({
        where: {
          email,
        },
      });

    if (existedUser) {
      throw new ForbiddenException('Email already existed.');
    }

    const digestedPassword = await digestPassword(userCreateReqDto.password);

    const newUser = await typeormService.source.getRepository(UserEntity).save(
      new UserEntity({
        ...userCreateReqDto,
        password: digestedPassword[0],
        salt: digestedPassword[1],
      }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, salt, ...result } = newUser;

    return result;
  }

  async findAll(): Promise<User[] | undefined> {
    return typeormService.source.getRepository(UserEntity).find();
  }

  async findOne(id: number): Promise<User | undefined> {
    const foundUser = await typeormService.source
      .getRepository(UserEntity)
      .findOne({
        where: {
          id,
        },
      });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    return foundUser;
  }

  async deleteOne(id: number): Promise<boolean | undefined> {
    const foundUser = await typeormService.source
      .getRepository(UserEntity)
      .findOne({
        where: {
          id,
        },
      });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    return !!(await typeormService.source
      .getRepository(UserEntity)
      .delete(foundUser));
  }
}
