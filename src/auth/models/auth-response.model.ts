import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  authToken!: string;
}
