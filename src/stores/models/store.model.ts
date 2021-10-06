import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Store {
  @Field(() => ID)
  id!: number;

  name!: string;

  url!: string;
}
