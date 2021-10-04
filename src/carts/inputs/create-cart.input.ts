import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  exampleField!: number;
}
