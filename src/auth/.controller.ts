import {
  Controller,
  HttpCode,
  Post,
  Body,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './.service';
import { SignInDto } from './.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const jwt = await this.authService.signIn(signInDto);
    return res.set('Authorization', 'Bearer ' + jwt.access_token).json(jwt);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  isAuthenticated(@Req() req: any): any {
    console.log(req);
    const user: any = req.user;
    return user;
  }
}
