import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { User, UserTier } from '@src/database/entity/user/user.entity';
import { UserService } from '@src/user/service/user.service';
import { extractBearerToken } from '../util/extract-token';

export interface JwtAccessPayload {
    id: number;
    email: string;
    tier: UserTier;
}

export interface JwtRefreshPayload {
    id: number;
    email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: JwtAccessPayload): Promise<User> {
        if (payload.tier === UserTier.REMOVED)
            throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
        return {
            id: payload.id,
            email: payload.email,
            tier: payload.tier,
        };
    }
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: JwtRefreshPayload): Promise<User> {
        const refreshToken = extractBearerToken(req?.get('authorization'));
        const user = await this.userService.findByEmail(payload.email);
        if (
            !user ||
            user.refreshToken !== refreshToken ||
            user.tier === UserTier.REMOVED
        )
            throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
        return {
            id: user.id,
            email: user.email,
            tier: user.tier,
        };
    }
}
