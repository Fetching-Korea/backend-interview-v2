import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/database/entity/user/user.entity';
import { JwtAccessPayload, JwtRefreshPayload } from '../strategy/jwt.strategy';

type JWT = (JwtAccessPayload | JwtRefreshPayload) & {
    exp: number;
    iat: number;
};

export enum TokenType {
    JWT_ACCESS_TOKEN = 'access_token',
    JWT_REFRESH_TOKEN = 'refresh_token',
}

export interface TokenSet {
    access: string;
    refresh: string;
    iat: number;
    exp: number;
}

@Injectable()
export class JWTUtilService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    createTokenSet(user: User): TokenSet {
        const access = this.createAccessToekn(user);
        const refresh = this.createRefreshToken(user);
        const { iat, exp } = this.getExpiresByTokens({ access, refresh });
        return {
            access,
            refresh,
            iat,
            exp,
        };
    }

    createAccessToekn(user: User): string {
        const payload = {
            id: user.id,
            email: user.email,
            tier: user.tier,
        };
        return this.generateToken(payload, TokenType.JWT_ACCESS_TOKEN);
    }

    createRefreshToken(user: User): string {
        let token: JWT | undefined = undefined;
        try {
            token = this.verify(
                user.refreshToken!,
                TokenType.JWT_REFRESH_TOKEN,
            );
        } catch (err) {}
        if (token) return user.refreshToken!;
        const payload = { id: user.id, email: user.email };
        return this.generateToken(payload, TokenType.JWT_REFRESH_TOKEN);
    }

    private generateToken(
        payload: Record<string, any>,
        type: TokenType,
    ): string {
        return this.jwtService.sign(payload, this.getKey(type));
    }

    private getKey(type: TokenType): { secret: string; expiresIn: string } {
        if (type === TokenType.JWT_ACCESS_TOKEN) {
            return {
                secret: this.configService.get('JWT_ACCESS_SECRET')!,
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRES')!,
            };
        } else if (type === TokenType.JWT_REFRESH_TOKEN) {
            return {
                secret: this.configService.get('JWT_REFRESH_SECRET')!,
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRES')!,
            };
        } else {
            throw new Error('not supported token type');
        }
    }

    getExpiresByTokens({
        access,
        refresh,
    }: {
        access: string;
        refresh: string;
    }): {
        exp: number;
        iat: number;
    } {
        const tokens = [
            {
                token: access,
                type: TokenType.JWT_ACCESS_TOKEN,
            },
            {
                token: refresh,
                type: TokenType.JWT_REFRESH_TOKEN,
            },
        ];
        const jwtToken = tokens
            .map((token) => {
                const maxAge = this.getMaxAge(token.token, token.type);
                return {
                    ...token,
                    maxAge,
                };
            })
            .sort((a, b) => a.maxAge! - b.maxAge!)
            .at(0);
        const decoded = this.verify(jwtToken!.token, jwtToken!.type);
        return { exp: decoded.exp, iat: decoded.iat };
    }

    private getMaxAge(token: string, type: TokenType): number {
        try {
            const decoded = this.verify(token, type);
            const currentTimestamp = new Date().getTime();
            const maxAge = (decoded.exp * 1000 - currentTimestamp) / 1000;
            return maxAge > 0 ? Math.floor(maxAge) : 0;
        } catch (error) {
            return 0;
        }
    }

    private verify(token: string, type: TokenType): JWT {
        const decoded = this.jwtService.verify(token, {
            secret: this.getKey(type).secret,
        });
        return decoded as JWT;
    }
}
