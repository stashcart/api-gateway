import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => Int)
  id!: number;

  url!: string;

  price?: number;

  name?: string;

  storeName!: string;
}
