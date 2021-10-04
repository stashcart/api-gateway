import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CartUser {
  @Field(() => ID)
  id!: string;

  name?: string;
}
