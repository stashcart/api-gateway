import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  accessToken!: string;

  refreshToken!: string;
}
