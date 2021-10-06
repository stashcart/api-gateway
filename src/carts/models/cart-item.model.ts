import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CartUser } from './cart-user.model';
import { Product } from './product.model';

export enum CartItemStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
registerEnumType(CartItemStatus, { name: 'CartItemStatus' });

@ObjectType()
export class CartItem {
  @Field(() => Int)
  id!: number;

  customer!: CartUser;

  product!: Product;

  @Field(() => Int)
  amount!: number;

  status!: CartItemStatus;
}
