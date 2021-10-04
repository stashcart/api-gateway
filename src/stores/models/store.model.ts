import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Store {
  id!: number;

  name!: string;

  url!: string;
}
