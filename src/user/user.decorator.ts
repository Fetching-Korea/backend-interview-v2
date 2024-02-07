import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type RequestUserType = {
  id: number;
  uId: string;
  email: string;
  iat: number;
  exp: number;
};

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): RequestUserType => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as RequestUserType;
  },
);
