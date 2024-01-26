import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { loginFrom } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
    ) {}

  async validateUser(loginFrom: loginFrom): Promise<any> {
    // 사용자를 검증하고, 검증 성공 시 JWT 토큰을 생성하여 반환
    const user = await this.validateUserCredentials(loginFrom);
    if (user) {
        console.log(user);
      const payload = { sub: user.id, username: user.email };
      console.log(payload);
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async validateUserById(userId: number): Promise<any> {
    // 사용자 ID를 기반으로 사용자를 검색하는 메서드
    // 이 메서드는 JwtStrategy에서 호출됩니다.
    // 실제 프로덕션에서는 데이터베이스와 연결하여 사용자를 검색해야 합니다.
    return { id: userId, username: 'user' };
  }

  private async validateUserCredentials(loginFrom: loginFrom): Promise<any> {
    // 실제 사용자 인증을 수행하는 메서드
    // 여기에서는 간단한 검증 로직을 사용하며, 실제 프로덕션에서는 보안을 강화해야 합니다.
    const user = await this.userRepository.findOne({ where: { email: loginFrom.email } });

    if (user && user.password === loginFrom.password) {
      return user;
    }
    return null;
  }

  async decodeToken(token: string): Promise<any> {
    try {
        const decoded = this.jwtService.verify(token, { secret: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NjIyNjM0MywiaWF0IjoxNjk2MjI2MzQzfQ.kIR_AzU7MIjvv7zau5MTajQ668-YlCfMj-chP5p96bk' }); // 시크릿 키를 설정에 따라 변경
        return decoded;
    } catch (error) {
        // 토큰이 유효하지 않은 경우 에러 처리
        console.error(error);
        return null;
    }
}  
}



// @Injectable()
// export class AuthService {
//     constructor(
//         @InjectRepository(User)
//         private userRepository: Repository<User>
//     ) {}

//     // 실제 사용자 인증을 수행하는 메서드
//     async validateUser(loginFrom: loginFrom): Promise<any> {
//         // findOne 메서드 호출 수정
//         const user = await this.userRepository.findOne({ where: { email: loginFrom.email } });

//         // 여기에서는 간단한 검증 로직을 사용하며, 실제 프로덕션에서는 보안을 강화해야 합니다.
//         if (user && user.password === loginFrom.password) {
//             // 패스워드 비교를 통한 검증 로직 (간단한 예시로 제공, 프로덕션에서는 bcrypt 등을 사용해야 합니다.)
//             return { id: user.id, username: user.nickName };
//         }
//         return null;
//     }
// }

