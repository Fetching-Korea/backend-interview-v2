import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '../shared/dto/error-response.dto';
import { LoginResDto } from './dto/login-res.dto';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/login-req.dto';
import { RefreshReqDto } from './dto/refresh-req.dto';

@ApiResponse({
  status: 400,
  description: 'BadRequest.',
  type: ErrorResponseDto,
})
@ApiResponse({
  status: 401,
  description: 'Unauthorized.',
  type: ErrorResponseDto,
})
@ApiResponse({ status: 403, description: 'Forbidden.', type: ErrorResponseDto })
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('controller-auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('for-user')
  @ApiTags('for-admin')
  @ApiResponse({
    status: 201,
    description: 'Token and user information',
    type: LoginResDto,
  })
  @ApiOperation({
    description: 'Login with email and password',
  })
  @Post('login')
  async Login(@Body() loginReqDto: LoginReqDto) {
    const user = await this.authService.validateUser(
      loginReqDto.email,
      loginReqDto.password,
    );
    if (!user) throw new UnauthorizedException();

    return <LoginResDto>await this.authService.login(user);
  }

  @ApiTags('for-user')
  @ApiTags('for-admin')
  @ApiResponse({
    status: 201,
    description: 'Token and user information',
    type: LoginResDto,
  })
  @ApiOperation({
    description: 'Refresh tokens with refresh token',
  })
  @Post('refresh')
  async Refresh(@Body() refreshReqDto: RefreshReqDto) {
    const user = await this.authService.validateRefreshToken(
      refreshReqDto.refreshToken,
    );
    if (!user) throw new UnauthorizedException();
    return <LoginResDto>await this.authService.login(user);
  }
}
