import { HttpException, HttpStatus, Injectable, NotFoundException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Tokens } from './types';
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private prismaService : PrismaService, private jwtService: JwtService){}

	async validateUser(sessionId: string) {
		const session = await this.prismaService.session.findFirst({
			where: { sessionId }
		});

		if (!session) {
			throw new UnauthorizedException('Access Denied.');
		}
	}

	async getTokens(userId: number, sessionId: string): Promise<Tokens> {
		const [at, rt] = await Promise.all([
			this.jwtService.signAsync(
			{
				userId,
				sessionId
			},
			{
				secret: 'at-fetching',
				expiresIn: 60 * 10, 
			}), 
			this.jwtService.signAsync(
			{
				sessionId
			},
			{
				secret: 'rt-fetching',
				expiresIn: 60 * 60 * 24 * 30,
			})
		]);

		return {
			accessToken: at,
			refreshToken: rt
		}
	}

	async signup(userData: SignupUserDto): Promise<unknown> {
		const id = userData.id;
		const pwd = userData.password;

		const userExist = await this.prismaService.user.findFirst({
			where: { id }
		});

		if (userExist) {
			throw new ForbiddenException('user data already exists.');
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

	async login(userData: LoginUserDto): Promise<Tokens> {
		let tokens;
		const id = userData.id;
		const password = userData.password;

		const user = await this.prismaService.user.findUnique({
			where: {
				id: id
			}
		});

		if (!user) {
			throw new NotFoundException('userData not found.');
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			throw new ForbiddenException('Access Denied');
		} else {
			let sessionId;

			while (true) {
				sessionId = crypto.randomBytes(95).toString('base64');
				const session = await this.prismaService.session.findFirst({
					where: { sessionId },
				});

				if (!session) break;
			}

			await this.prismaService.session.create({
				data: { sessionId, user: { connect: {id} }}
			});
			tokens = await this.getTokens(user.userId, sessionId);
		}

		return tokens;
	}

	async logout(sessionId: string) {
		await this.prismaService.session.delete({
			where: {
				sessionId: sessionId,
			}
		});
	}

	async newToken(sessionId: string): Promise<unknown> {
		const session = await this.prismaService.session.findFirst({ where: { sessionId }});
		if (!session) {
			throw new ForbiddenException("Access Denied.");
		}

		const newAccessToken = await this.jwtService.signAsync(
			{
				userId: session.userId,
				sessionId: session.sessionId
			},
			{
				secret: 'at-fetching',
				expiresIn: 60 * 10, 
			});

		return { accessToken: newAccessToken };
	}
}
