import { JwtAuthGuard, JwtRefreshAuthGuard } from './jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

export const UseJwtAuthGuard = () => UseGuards(JwtAuthGuard);
export const UseJwtRefreshAuthGuard = () => UseGuards(JwtRefreshAuthGuard);
