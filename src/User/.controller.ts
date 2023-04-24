import { Body, Controller } from '@nestjs/common';
import { UserService } from './.service';
import { Post } from '@nestjs/common';
import { CreateUserDto } from './.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
