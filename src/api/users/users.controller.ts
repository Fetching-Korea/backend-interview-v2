import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  postSignUp(@Body() userData: CreateUserDTO) {
    return this.usersService.create(userData);
  }
}
