import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2'
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (!user) return null;
        const validPw = await argon2.verify(user.password, password);
        if (validPw) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
