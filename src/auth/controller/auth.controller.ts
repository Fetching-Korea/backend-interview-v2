import { Body, Controller, Post, Req } from '@nestjs/common';
import { CurrentUser } from '@src/common/decorator/user.decorator';
import { User } from '@src/database/entity/user/user.entity';
import { SignInDto } from '../dto/sign-in.dto';
import { UseJwtRefreshAuthGuard } from '../guard';
import { AuthService } from '../service/auth.service';
import { TokenSet } from '../service/jwt-util.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sing-in')
    async signIn(@Body() dto: SignInDto): Promise<TokenSet> {
        return await this.authService.signIn(dto);
    }

    @UseJwtRefreshAuthGuard()
    @Post('refresh')
    async refresh(@CurrentUser() user: User): Promise<TokenSet> {
        return await this.authService.refresh(user);
    }
}
