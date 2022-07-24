import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import { AuthService } from '../auth.service';

type JwtPayload = {
	userId: number,
	sessionId: string
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'at-fetching',
		});
	}

	async validate(payload: JwtPayload) {
		await this.authService.validateUser(payload.sessionId);
		return payload;
	}
}