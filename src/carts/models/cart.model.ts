import { ObjectType } from '@nestjs/graphql';
import { CartItem } from './cart-item.model';
import { CartPreview } from './cart-preview.model';

@ObjectType()
export class Cart extends CartPreview {
  items!: CartItem[];
}
