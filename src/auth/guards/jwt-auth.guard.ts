import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';

interface GqlRequest {
  user: string;
  headers: Record<string, string>;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const jwt = this.getJwtFromRequest(request);

    request.user = await this.authService.verifyToken(jwt);

    return true;
  }

  private getJwtFromRequest(request: GqlRequest): string {
    const authToken: string = request.headers.authorization;
    return authToken.split('Bearer ')[1];
  }
}
