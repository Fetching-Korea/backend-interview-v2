import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

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
}
