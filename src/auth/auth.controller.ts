import { Body, Controller, Delete, Get, HttpCode, Post, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Tokens } from './types';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// 회원가입을 할 때 사용한다.
	// POST 요청으로 id, password, userName을 받는다.
	@Public()
	@Post("/signup")
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body() userData: SignupUserDto): Promise<unknown> {
		return this.authService.signup(userData);
	}

	// 로그인을 할 때 사용한다.
	// POST 요청으로 id와 password를 받으며 { accessToken, refreshToken }을 리턴한다.
	@Public()
	@Post("/login")
	@HttpCode(HttpStatus.OK)
	async login(@Body() userData: LoginUserDto): Promise<Tokens> {
		return this.authService.login(userData);
	}

	// 로그아웃을 할 때 사용한다.
	// 로그인을 할 때 session 데이터가 생성되는데 로그아웃에서 이 session 데이터가 지워진다.
	@Delete("/logout")
	@HttpCode(HttpStatus.OK)
	async logout(@GetCurrentUser('sessionId') sessionId: string) {
		return this.authService.logout(sessionId);
	}

	// access token의 유효기간이 만료되었을 경우 새 access token을 갱신받을 때 사용한다.
	// bearer token 자리에 refresh token을 집어넣고 요청 보내면 새로운 access token을 발급받을 수 있다.
	@Public()
	@UseGuards(RtGuard)
	@Post("/new")
	@HttpCode(HttpStatus.OK)
	async newToken(@GetCurrentUser('sessionId') sessionId: string) {
		return this.authService.newToken(sessionId);
	}
}
