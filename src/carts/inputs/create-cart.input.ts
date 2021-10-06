import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  title!: string;

  isAutoApproveEnabled?: boolean = false;

  @Field(() => ID)
  storeId!: number;
}
