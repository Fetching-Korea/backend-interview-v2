import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(
    @Body()
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<AuthCredentialsDto> {
    await this.usersService.signUp(authCredentialsDto);
    return authCredentialsDto;
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signIn(
    @Body() authSignInDto: AuthSignInDto,
  ): Promise<{ accessToken: string; userInfo: object }> {
    const result = await this.usersService.signIn(authSignInDto);
    console.log('signin_controller::', result);
    return result;
  }
}
