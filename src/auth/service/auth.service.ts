import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserTier } from '@src/database/entity/user/user.entity';
import { UserService } from '@src/user/service/user.service';
import { SignInDto } from '../dto/sign-in.dto';
import { JWTUtilService, TokenSet } from './jwt-util.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jWTUtilService: JWTUtilService,
    ) {}

    async signIn({ email, password }: SignInDto): Promise<TokenSet> {
        const user = await this.validateUser(email, password);
        if (!user)
            throw new HttpException(
                'Wrong email or password',
                HttpStatus.FORBIDDEN,
            );
        const tokenSet = this.jWTUtilService.createTokenSet(user);
        await this.updateRefreshToken(user, tokenSet);
        return tokenSet;
    }

    async refresh(user: User): Promise<TokenSet> {
        const tokenSet = this.jWTUtilService.createTokenSet(user);
        await this.updateRefreshToken(user, tokenSet);
        return tokenSet;
    }

    private async updateRefreshToken(user: User, tokenSet: TokenSet) {
        if (user.refreshToken === tokenSet.refresh) return;
        await this.userService.update(user, {
            refreshToken: tokenSet.refresh,
        });
    }

    private async validateUser(
        email: string,
        password: string,
    ): Promise<User | undefined> {
        const user = await this.userService.findByEmail(email);
        if (!user || user.tier === UserTier.REMOVED) return;
        const isCompare = await bcrypt.compare(password, user.password!);
        return isCompare ? user : undefined;
    }
}
