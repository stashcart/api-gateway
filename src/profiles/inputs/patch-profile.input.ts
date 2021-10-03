import { InputType } from '@nestjs/graphql';

@InputType()
export class PatchProfileInput {
  name?: string;

  email?: string;

  phone?: string;
}
