import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id!: string;

  email?: string;

  name?: string;

  phone?: string;
}
