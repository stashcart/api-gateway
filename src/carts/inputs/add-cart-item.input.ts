import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddCartItemInput {
  productUrl!: string;

  @Field(() => Int)
  amount!: string;
}
