import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Fetches user id from request.
 *
 * @example
 * .@Get()
 * async getData(@UserId() userId: string) {}
 */
export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
