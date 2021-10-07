import { ArgsType, Field } from '@nestjs/graphql';
import { CartItemStatus } from '../models/cart-item.model';

@ArgsType()
export class CartItemsStatusArgs {
  @Field(() => CartItemStatus)
  itemsStatus?: CartItemStatus;
}
