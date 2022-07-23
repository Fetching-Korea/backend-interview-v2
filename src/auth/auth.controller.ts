import { Body, Controller, Delete, Get, HttpCode, Post, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post("/signup")
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body() userData: SignupUserDto): Promise<unknown> {
		return this.authService.signup(userData);
	}

	@Public()
	@Post("/login")
	@HttpCode(HttpStatus.OK)
	async login(@Body() userData: LoginUserDto): Promise<Tokens> {
		return this.authService.login(userData);
	}

	@Delete("/logout")
	@HttpCode(HttpStatus.OK)
	logout(@GetCurrentUser('sessionId') sessionId: string) {
		return this.authService.logout(sessionId);
	}

	@Public()
	@UseGuards(RtGuard)
	@Post("/new")
	@HttpCode(HttpStatus.OK)
	newToken(@GetCurrentUser('sessionId') sessionId: string) {
		return this.authService.newToken(sessionId);
	}
}
