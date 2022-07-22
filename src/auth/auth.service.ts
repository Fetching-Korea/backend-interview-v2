import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from "bcrypt";
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
	constructor(private prismaService : PrismaService){}

	async signup(userData: SignupUserDto): Promise<unknown> {
		const id = userData.id;
		const pwd = userData.password;

		const userExist = await this.prismaService.user.findFirst({
			where: { id }
		});

		// test 해보기
		if (userExist) {
			throw new HttpException({
				status: HttpStatus.FORBIDDEN,
				error: "user data already exists",
			}, HttpStatus.FORBIDDEN);
		}

		const password = await bcrypt.hash(pwd, 5);
		
		let userInfo = {
			id,
			password,
			userName: userData.userName
		}

		const result = await this.prismaService.user.create({
			data: userInfo
		});

		return {
			...result
		};
	}

	async login(userData: LoginUserDto): Promise<unknown> {
		return true;
	}

	async logout() {

	}

	async newToken() {
		
	}
}
