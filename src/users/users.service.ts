import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { CartRepository } from 'src/cart/cart.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private cartRepository: CartRepository,
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const newUser = await this.userRepository.createUser(authCredentialsDto);
    if (newUser) {
      const newCart = await this.cartRepository.create({
        user: { id: newUser.id },
      });
      console.log(newCart);
    }
    return newUser;
  }

  async signIn(
    authSignInDto: AuthSignInDto,
  ): Promise<{ accessToken: string; userInfo: object }> {
    const { email, password } = authSignInDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 이메일 입니다.');
    } else if (await bcrypt.compare(password, user.password)) {
      const payload = { nickname: user.nickname };
      const accessToken = await this.jwtService.sign(payload);
      return {
        accessToken,
        userInfo: {
          nickname: user.nickname,
          email: user.email,
        },
      };
    } else {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
  }
}
