import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private readonly config: ConfigService,
    private jwtService: JwtService,
  ) {}

  /**
   * 예시 id, 비밀번호
   * {
   * "id": "test1234",
   * "pw":"12345678"
   *  }
   */
  async validateUser(userId: string, userPw: string): Promise<object> {
    let userFind = await this.userRepository.findOneBy({
      id: userId,
    });

    const validatePassword = await bcrypt.compare(userPw, userFind.pw);
    if (!userFind || !validatePassword) {
      throw new UnauthorizedException();
    }
    return {
      isSuccess: true,
      userIdx: userFind.userIdx,
    };
  }

  async login(userData: any) {
    return this.validateUser(userData.id, userData.pw);
  }
}
