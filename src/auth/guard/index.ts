import { JwtAuthGuard, JwtRefreshAuthGuard } from './jwt-auth.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { UserTier } from '@src/database/entity/user/user.entity';

export const UseJwtAuthGuard = () => UseGuards(JwtAuthGuard);
export const UseJwtRefreshAuthGuard = () => UseGuards(JwtRefreshAuthGuard);
export const GrantAuth = (...roles: UserTier[]) => {
    return applyDecorators(
        SetMetadata('userTier', roles),
        UseGuards(JwtAuthGuard, RolesGuard),
    );
};
