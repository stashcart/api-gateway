import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id!: number;

  url!: string;

  price?: number;

  name?: string;

  storeName!: string;
}
