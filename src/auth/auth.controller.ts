import { Body, Controller, Post, ValidationPipe, UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{statusCode:string, contents:string}> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authLoginDto: AuthLoginDto): Promise<{statusCode:string, contents:string}> {
        return this.authService.signIn(authLoginDto);
    }
}
