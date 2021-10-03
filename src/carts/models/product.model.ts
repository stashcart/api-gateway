import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  id!: number;

  url!: string;

  price?: number;

  name?: string;

  storeName!: string;
}
