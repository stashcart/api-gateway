import { InputType } from '@nestjs/graphql';

@InputType()
export class RefreshTokenInput {
  refreshToken!: string;
}
