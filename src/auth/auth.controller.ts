import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/signup")
	async signup(@Body() userData: SignupUserDto): Promise<unknown> {
		return this.authService.signup(userData);
	}

	@Post("/login")
	async login(@Body() userData: LoginUserDto): Promise<unknown> {
		return this.authService.login(userData);
	}

	@Delete("/logout")
	logout() {
		return this.authService.logout();
	}

	@Post("/new")
	newToken() {
		return this.authService.newToken();
	}
}
