import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UnauthorizedException } from "@nestjs/common/exceptions";
import * as bcrypt from 'bcryptjs';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto) : Promise<{statusCode:string, contents:string}> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authLoginDto: AuthLoginDto) : Promise<{statusCode:string, contents : string}> {
        const {customId , password } = authLoginDto;
        const user = await this.userRepository.findOne({ customId });

        if(user && await bcrypt.compare(password, user.password)){
            const payload = { customId : user.customId };
            const accessToken = await this.jwtService.sign(payload);

            return {statusCode:"200", contents : accessToken};
        }
        else{
            throw new UnauthorizedException('login failed');
        }
    }
}
