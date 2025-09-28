import { createParamDecorator, ExecutionContext } from "@nestjs/common";




export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!req) return null;
    const user = req.user;
    return data ? user?.[data] : user;
  },
);