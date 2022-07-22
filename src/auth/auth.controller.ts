import { Controller, Delete, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/signup")
	signup() {
		return this.authService.signup();
	}

	@Post("/login")
	login() {
		return this.authService.login();
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
