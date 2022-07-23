import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt'

type JwtPayload = {
	userId: number,
	sessionId: string
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'at-fetching',
		});
	}

	validate(payload: JwtPayload) {
		return payload;
	}
}