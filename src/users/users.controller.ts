import {
  Controller,
  Post,
  Body,
  Param,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInfo } from './userInfo';
import { AuthGuard } from 'src/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const { userName, password, displayName } = createUserDto;

    return this.usersService.create(userName, password, displayName);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<string> {
    const { userName, password } = loginUserDto;

    return this.usersService.login(userName, password);
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  async getUserInfo(
    @Headers() headers: any,
    @Param('id') id: string,
  ): Promise<UserInfo> {
    return this.usersService.getUserInfo(id);
  }
}
