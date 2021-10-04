import { ObjectType } from '@nestjs/graphql';
import { CartUser } from './cart-user.model';

@ObjectType()
export class CartPreview {
  id!: number;

  title!: string;

  owner!: CartUser;

  storeName!: string;

  isAutoApproveEnabled!: boolean;
}
