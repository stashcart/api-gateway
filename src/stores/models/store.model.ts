import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Store {
  @Field(() => Int)
  id!: number;

  name!: string;

  url!: string;
}
