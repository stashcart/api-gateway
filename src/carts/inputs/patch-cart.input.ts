import { InputType } from '@nestjs/graphql';

@InputType()
export class PatchCartInput {
  id!: number;
}
