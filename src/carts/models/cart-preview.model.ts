import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CartUser } from './cart-user.model';

@ObjectType()
export class CartPreview {
  @Field(() => ID)
  id!: number;

  title!: string;

  owner!: CartUser;

  storeName!: string;

  isAutoApproveEnabled!: boolean;
}
