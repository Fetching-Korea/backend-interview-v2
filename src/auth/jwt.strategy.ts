import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { UserRepository } from "src/users/user.repository";
import appconfig from './appconfig.json';
import { UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: appconfig.jwtKey,
        });
    }

    async validate(payload) : Promise<User> {
        const { customId } = payload;
        const user = await this.UserRepository.findOne({ where : {customId} });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}