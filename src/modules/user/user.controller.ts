import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { CreateReqDto } from './dto/create-req.dto';
import { UserService } from './user.service';
import { ErrorResponseDto } from '../shared/dto/error-response.dto';
import { LoginResDto } from '../auth/dto/login-res.dto';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../auth/jwt.guard';

@ApiResponse({
  status: 401,
  description: 'Unauthorized.',
  type: ErrorResponseDto,
})
@ApiResponse({ status: 403, description: 'Forbidden.', type: ErrorResponseDto })
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('controller-user')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiTags('for-admin')
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: [UserEntity],
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({
    description: 'Get list of users',
  })
  @Get()
  findAll(@Request() req) {
    if (!req.user.isAdmin) throw new UnauthorizedException();
    return this.userService.findAll();
  }

  @ApiTags('for-user')
  @ApiTags('for-admin')
  @ApiResponse({
    status: 201,
    description: 'Token and user information',
    type: LoginResDto,
  })
  @ApiOperation({
    description: 'Create a user or admin',
  })
  @Post()
  async insert(@Body() createReqDto: CreateReqDto) {
    const newUser = await this.userService.insert(createReqDto);

    return <LoginResDto>await this.authService.login(newUser);
  }

  @ApiTags('for-user')
  @ApiTags('for-admin')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserEntity,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({
    description: 'Get information of specific user',
  })
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (id !== req.user.id && !req.user.isAdmin)
      throw new UnauthorizedException();
    return this.userService.findOne(id);
  }

  @ApiTags('for-user')
  @ApiTags('for-admin')
  @ApiResponse({
    status: 200,
    description: 'The found record is executed',
    type: Boolean,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({
    description: 'Delete specific User',
  })
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    if (id !== req.user.id && !req.user.isAdmin)
      throw new UnauthorizedException();
    return this.userService.deleteOne(id);
  }
}
