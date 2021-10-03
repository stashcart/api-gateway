import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { Profile } from 'src/profiles/models/profile.model';
import { Product } from './product.model';

export enum CartItemStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
registerEnumType(CartItemStatus, { name: 'CartItemStatus' });

@ObjectType()
export class CartItem {
  id!: number;

  customer!: Profile;

  product!: Product;

  amount!: number;

  status!: CartItemStatus;
}
